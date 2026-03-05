import React, { forwardRef, createContext, useContext, useRef, useEffect } from 'react';
import { View, Text, Animated, StyleSheet, type ViewProps, type ViewStyle } from 'react-native';
import { useTacNativeTheme } from '../provider/TacNativeProvider';
import { springConfigs } from '../constants/motion';

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

interface StepperContextValue {
  activeStep: number;
  orientation: 'horizontal' | 'vertical';
  totalSteps: number;
}

const StepperContext = createContext<StepperContextValue>({
  activeStep: 0,
  orientation: 'horizontal',
  totalSteps: 0,
});

interface StepIndexContextValue {
  index: number;
}

const StepIndexContext = createContext<StepIndexContextValue>({ index: 0 });

// ---------------------------------------------------------------------------
// Check icon (inline SVG-like using View shapes)
// ---------------------------------------------------------------------------

function CheckMark({ color }: { color: string }) {
  return (
    <View style={checkStyles.container}>
      {/* Simple check using two lines as pseudo-SVG via Transforms */}
      <View style={[checkStyles.checkLeft, { backgroundColor: color }]} />
      <View style={[checkStyles.checkRight, { backgroundColor: color }]} />
    </View>
  );
}

const checkStyles = StyleSheet.create({
  container: {
    width: 14,
    height: 14,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  checkLeft: {
    position: 'absolute',
    width: 5,
    height: 2,
    borderRadius: 1,
    bottom: 4,
    left: 1,
    transform: [{ rotate: '45deg' }],
  },
  checkRight: {
    position: 'absolute',
    width: 9,
    height: 2,
    borderRadius: 1,
    bottom: 5,
    right: 0,
    transform: [{ rotate: '-45deg' }],
  },
});

// ---------------------------------------------------------------------------
// Animated connector
// ---------------------------------------------------------------------------

function AnimatedConnector({
  isCompleted,
  orientation,
}: {
  isCompleted: boolean;
  orientation: 'horizontal' | 'vertical';
}) {
  const { theme } = useTacNativeTheme();
  const progress = useRef(new Animated.Value(isCompleted ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(progress, {
      toValue: isCompleted ? 1 : 0,
      ...springConfigs.gentle,
      useNativeDriver: false,
    }).start();
  }, [isCompleted, progress]);

  if (orientation === 'horizontal') {
    return (
      <View style={[connectorStyles.trackH, { backgroundColor: theme.colors.border }]}>
        <Animated.View
          style={[
            connectorStyles.fillH,
            {
              backgroundColor: theme.colors.point,
              width: progress.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }),
            },
          ]}
        />
      </View>
    );
  }

  return (
    <View style={[connectorStyles.trackV, { backgroundColor: theme.colors.border, marginLeft: 13 }]}>
      <Animated.View
        style={[
          connectorStyles.fillV,
          {
            backgroundColor: theme.colors.point,
            height: progress.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }),
          },
        ]}
      />
    </View>
  );
}

const connectorStyles = StyleSheet.create({
  trackH: { flex: 1, height: 2, marginHorizontal: 6, borderRadius: 1, overflow: 'hidden', alignSelf: 'center' },
  fillH: { height: '100%', borderRadius: 1 },
  trackV: { width: 2, height: 24, marginVertical: 4, borderRadius: 1, overflow: 'hidden' },
  fillV: { width: '100%', borderRadius: 1 },
});

// ---------------------------------------------------------------------------
// StepCircle — used in horizontal top row
// ---------------------------------------------------------------------------

function StepCircle({ icon, index }: { icon?: React.ReactNode; index: number }) {
  const { theme } = useTacNativeTheme();
  const { activeStep } = useContext(StepperContext);
  const isCompleted = index < activeStep;
  const isActive = index === activeStep;

  const bgColor = isCompleted ? theme.colors.point : isActive ? theme.colors.background : theme.colors.secondary;
  const borderColor = isCompleted || isActive ? theme.colors.point : 'transparent';
  const textColor = isCompleted
    ? theme.colors.pointForeground
    : isActive
      ? theme.colors.point
      : theme.colors.mutedForeground;

  // Check icon entrance animation
  const checkScale = useRef(new Animated.Value(isCompleted ? 1 : 0)).current;
  useEffect(() => {
    if (isCompleted) {
      Animated.spring(checkScale, {
        toValue: 1,
        ...springConfigs.entrance,
        useNativeDriver: true,
      }).start();
    } else {
      checkScale.setValue(0);
    }
  }, [isCompleted, checkScale]);

  // Step number scale animation when active
  const numberScale = useRef(new Animated.Value(isActive ? 1 : 0.8)).current;
  useEffect(() => {
    Animated.spring(numberScale, {
      toValue: isActive ? 1 : 0.8,
      ...springConfigs.light,
      useNativeDriver: true,
    }).start();
  }, [isActive, numberScale]);

  return (
    <View
      style={[
        circleStyles.circle,
        {
          backgroundColor: bgColor,
          borderColor,
          borderWidth: 1.5,
        },
      ]}
    >
      {isCompleted ? (
        <Animated.View style={{ transform: [{ scale: checkScale }] }}>
          <CheckMark color={textColor} />
        </Animated.View>
      ) : icon ? (
        icon
      ) : (
        <Animated.Text style={[circleStyles.circleText, { color: textColor, transform: [{ scale: numberScale }] }]}>
          {index + 1}
        </Animated.Text>
      )}
    </View>
  );
}

const circleStyles = StyleSheet.create({
  circle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleText: { fontSize: 12, fontWeight: '600' },
});

// ---------------------------------------------------------------------------
// StepProps & Step sub-component
// ---------------------------------------------------------------------------

export interface StepProps {
  /** Step title text. */
  title: string;
  /** Optional description below the title. */
  description?: string;
  /** Icon to display instead of step number. */
  icon?: React.ReactNode;
  /** Override the step's visual state. */
  status?: 'pending' | 'active' | 'completed';
}

/**
 * Individual step within a Stepper (compound API).
 * Must be used as a direct child of Stepper.
 */
export const Step = forwardRef<View, StepProps & ViewProps>(
  ({ title, description, icon, status, style, ...props }, ref) => {
    const { theme } = useTacNativeTheme();
    const { activeStep } = useContext(StepperContext);
    const { index } = useContext(StepIndexContext);

    const resolvedStatus = status ?? (index < activeStep ? 'completed' : index === activeStep ? 'active' : 'pending');

    const isCompleted = resolvedStatus === 'completed';
    const isActive = resolvedStatus === 'active';

    const bgColor = isCompleted ? theme.colors.point : isActive ? theme.colors.background : theme.colors.secondary;
    const borderColor = isCompleted || isActive ? theme.colors.point : 'transparent';
    const iconColor = isCompleted
      ? theme.colors.pointForeground
      : isActive
        ? theme.colors.point
        : theme.colors.mutedForeground;
    const titleColor = isCompleted || isActive ? theme.colors.foreground : theme.colors.mutedForeground;

    // Check icon entrance animation
    const checkScale = useRef(new Animated.Value(isCompleted ? 1 : 0)).current;
    useEffect(() => {
      if (isCompleted) {
        Animated.spring(checkScale, {
          toValue: 1,
          ...springConfigs.entrance,
          useNativeDriver: true,
        }).start();
      } else {
        checkScale.setValue(0);
      }
    }, [isCompleted, checkScale]);

    // Step number scale animation when active
    const numberScale = useRef(new Animated.Value(isActive ? 1 : 0.8)).current;
    useEffect(() => {
      Animated.spring(numberScale, {
        toValue: isActive ? 1 : 0.8,
        ...springConfigs.light,
        useNativeDriver: true,
      }).start();
    }, [isActive, numberScale]);

    return (
      <View ref={ref} style={[stepStyles.row, style]} {...props}>
        {/* Circle */}
        <View
          style={[
            stepStyles.circle,
            {
              backgroundColor: bgColor,
              borderColor,
              borderWidth: 1.5,
            },
          ]}
        >
          {isCompleted ? (
            <Animated.View style={{ transform: [{ scale: checkScale }] }}>
              <CheckMark color={iconColor} />
            </Animated.View>
          ) : icon ? (
            icon
          ) : (
            <Animated.Text style={[stepStyles.circleText, { color: iconColor, transform: [{ scale: numberScale }] }]}>
              {index + 1}
            </Animated.Text>
          )}
        </View>

        {/* Labels */}
        <View style={stepStyles.labelContainer}>
          <Text style={[stepStyles.title, { color: titleColor }]}>{title}</Text>
          {description ? (
            <Text style={[stepStyles.description, { color: theme.colors.mutedForeground }]}>{description}</Text>
          ) : null}
        </View>
      </View>
    );
  },
);
Step.displayName = 'Step';

const stepStyles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  circle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  circleText: { fontSize: 12, fontWeight: '600' },
  labelContainer: { flexShrink: 1, paddingTop: 4 },
  title: { fontSize: 14, fontWeight: '500', lineHeight: 20 },
  description: { fontSize: 12, lineHeight: 16, marginTop: 2 },
});

// ---------------------------------------------------------------------------
// Stepper props & component
// ---------------------------------------------------------------------------

export interface StepperProps extends ViewProps {
  // New API
  activeStep?: number;
  children?: React.ReactNode;
  orientation?: 'horizontal' | 'vertical';
  alignLabels?: 'edge' | 'center';

  // Legacy API (backward compat)
  steps?: string[];
  currentStep?: number;

  style?: ViewStyle;
}

export const Stepper = forwardRef<View, StepperProps>(
  (
    {
      activeStep: activeStepProp,
      children,
      orientation = 'horizontal',
      alignLabels = 'edge',
      steps,
      currentStep,
      style,
      ...props
    },
    ref,
  ) => {
    const { theme } = useTacNativeTheme();

    // Resolve activeStep — new API takes precedence
    const resolvedActiveStep = activeStepProp ?? currentStep ?? 0;

    // Resolve child steps — new compound API or legacy string array
    let stepChildren: React.ReactElement<StepProps>[] = [];

    if (children) {
      stepChildren = React.Children.toArray(children).filter((c): c is React.ReactElement<StepProps> =>
        React.isValidElement(c),
      );
    } else if (steps) {
      stepChildren = steps.map((label, i) => <Step key={i} title={label} />);
    }

    const totalSteps = stepChildren.length;

    if (orientation === 'horizontal') {
      return (
        <StepperContext.Provider value={{ activeStep: resolvedActiveStep, orientation, totalSteps }}>
          <View ref={ref} style={[{ width: '100%' }, style]} {...props}>
            {/* Top row: circles + connectors */}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {stepChildren.map((child, index) => (
                <React.Fragment key={index}>
                  <StepIndexContext.Provider value={{ index }}>
                    <StepCircle icon={child.props.icon} index={index} />
                  </StepIndexContext.Provider>
                  {index < totalSteps - 1 && (
                    <AnimatedConnector isCompleted={index < resolvedActiveStep} orientation="horizontal" />
                  )}
                </React.Fragment>
              ))}
            </View>
            {/* Bottom row: labels */}
            <View style={{ flexDirection: 'row', marginTop: 8 }}>
              {stepChildren.map((child, index) => {
                const isLast = index === totalSteps - 1;
                const resolvedStatus =
                  child.props.status ??
                  (index < resolvedActiveStep ? 'completed' : index === resolvedActiveStep ? 'active' : 'pending');
                const isHighlighted = resolvedStatus === 'completed' || resolvedStatus === 'active';

                let textAlign: 'left' | 'center' | 'right' = 'center';
                if (alignLabels === 'edge') {
                  if (index === 0) textAlign = 'left';
                  else if (isLast) textAlign = 'right';
                  else textAlign = 'center';
                }

                return (
                  <View key={index} style={{ flex: 1, minWidth: 0 }}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '500',
                        color: isHighlighted ? theme.colors.foreground : theme.colors.mutedForeground,
                        textAlign,
                      }}
                      numberOfLines={2}
                    >
                      {child.props.title}
                    </Text>
                    {child.props.description ? (
                      <Text
                        style={{
                          fontSize: 11,
                          color: theme.colors.mutedForeground,
                          textAlign,
                          marginTop: 2,
                        }}
                        numberOfLines={2}
                      >
                        {child.props.description}
                      </Text>
                    ) : null}
                  </View>
                );
              })}
            </View>
          </View>
        </StepperContext.Provider>
      );
    }

    // Vertical layout — use compound Step children with connectors between
    return (
      <StepperContext.Provider value={{ activeStep: resolvedActiveStep, orientation, totalSteps }}>
        <View ref={ref} style={[style]} {...props}>
          {stepChildren.map((child, index) => (
            <StepIndexContext.Provider key={index} value={{ index }}>
              {React.cloneElement(child)}
              {index < totalSteps - 1 && (
                <AnimatedConnector isCompleted={index < resolvedActiveStep} orientation="vertical" />
              )}
            </StepIndexContext.Provider>
          ))}
        </View>
      </StepperContext.Provider>
    );
  },
);
Stepper.displayName = 'Stepper';
