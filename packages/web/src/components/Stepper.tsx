'use client';

import React, { createContext, forwardRef, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';
import { tacSpring } from '../constants/motion';

/** Orientation of the Stepper layout. */
export type StepperOrientation = 'horizontal' | 'vertical';

/** Label alignment strategy for horizontal stepper. */
export type StepperAlignLabels = 'edge' | 'center';

interface StepperContextValue {
  activeStep: number;
  orientation: StepperOrientation;
  totalSteps: number;
  alignLabels: StepperAlignLabels;
}

const StepperContext = createContext<StepperContextValue>({
  activeStep: 0,
  orientation: 'horizontal',
  totalSteps: 0,
  alignLabels: 'edge',
});

interface StepIndexContextValue {
  index: number;
}

const StepIndexContext = createContext<StepIndexContextValue>({ index: 0 });

/**
 * Multi-step wizard/workflow indicator container.
 * Manages active step state and passes it to child Step components.
 * @example
 * <Stepper activeStep={1}>
 *   <Step title="Account" />
 *   <Step title="Profile" />
 *   <Step title="Review" />
 * </Stepper>
 */
export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Zero-based index of the currently active step. */
  activeStep: number;
  /** Layout orientation. @default 'horizontal' */
  orientation?: StepperOrientation;
  /** Label alignment for horizontal layout. 'edge' aligns first left, last right; 'center' centers all. @default 'edge' */
  alignLabels?: StepperAlignLabels;
}

export const Stepper = forwardRef<HTMLDivElement, StepperProps>(
  ({ activeStep, orientation = 'horizontal', alignLabels = 'edge', className, children, ...props }, ref) => {
    const steps = React.Children.toArray(children);
    const totalSteps = steps.length;

    if (orientation === 'horizontal') {
      return (
        <StepperContext.Provider value={{ activeStep, orientation, totalSteps, alignLabels }}>
          <div
            ref={ref}
            role="group"
            aria-label="Progress steps"
            className={cn('flex flex-col gap-2', className)}
            {...props}
          >
            {/* Top row: circles + connectors */}
            <div className="flex items-center">
              {steps.map((child, index) => {
                const stepIcon = React.isValidElement<StepProps>(child) ? child.props.icon : undefined;
                return (
                  <React.Fragment key={index}>
                    <StepIndexContext.Provider value={{ index }}>
                      <StepCircle icon={stepIcon} />
                    </StepIndexContext.Provider>
                    {index < totalSteps - 1 && (
                      <div className="h-0.5 flex-1 mx-2 rounded-full bg-[var(--border)] overflow-hidden">
                        <motion.div
                          className="h-full bg-[var(--point)] rounded-full"
                          initial={false}
                          animate={{ width: index < activeStep ? '100%' : '0%' }}
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        />
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
            {/* Bottom row: labels */}
            <div className="flex">
              {steps.map((child, index) => {
                if (!React.isValidElement<StepProps>(child)) return null;
                const isLast = index === totalSteps - 1;
                return (
                  <StepIndexContext.Provider key={index} value={{ index }}>
                    <StepLabel
                      title={child.props.title}
                      description={child.props.description}
                      status={child.props.status}
                      className={cn(
                        'flex-1 min-w-0',
                        alignLabels === 'center'
                          ? 'text-center'
                          : cn(
                              index === 0 && 'text-left',
                              index > 0 && !isLast && 'text-center',
                              isLast && 'text-right',
                            ),
                      )}
                    />
                  </StepIndexContext.Provider>
                );
              })}
            </div>
          </div>
        </StepperContext.Provider>
      );
    }

    // Vertical
    const mappedChildren = steps.map((child, index) => (
      <StepIndexContext.Provider key={index} value={{ index }}>
        {child}
        {index < totalSteps - 1 && (
          <div className="w-0.5 min-h-[24px] ml-4 my-1 rounded-full bg-[var(--border)] overflow-hidden">
            <motion.div
              className="w-full bg-[var(--point)] rounded-full"
              initial={false}
              animate={{ height: index < activeStep ? '100%' : '0%' }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        )}
      </StepIndexContext.Provider>
    ));

    return (
      <StepperContext.Provider value={{ activeStep, orientation, totalSteps, alignLabels }}>
        <div ref={ref} role="group" aria-label="Progress steps" className={cn('flex flex-col', className)} {...props}>
          {mappedChildren}
        </div>
      </StepperContext.Provider>
    );
  },
);
Stepper.displayName = 'Stepper';

/** Internal circle indicator for horizontal layout. */
function StepCircle({ icon }: { icon?: React.ReactNode }) {
  const { activeStep } = useContext(StepperContext);
  const { index } = useContext(StepIndexContext);

  const isCompleted = index < activeStep;
  const isActive = index === activeStep;

  return (
    <motion.div
      className={cn(
        'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium shrink-0 border-[1.5px] border-solid',
        isCompleted && 'bg-[var(--point)] border-[var(--point)] text-[var(--point-foreground)]',
        isActive && 'border-[var(--point)] text-[var(--point)] bg-transparent',
        !isCompleted && !isActive && 'bg-[var(--secondary)] border-transparent text-[var(--muted-foreground)]',
      )}
      animate={isActive ? { scale: 1, boxShadow: 'none' } : { scale: 1, boxShadow: 'none' }}
      transition={tacSpring.default}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isCompleted ? (
          <motion.svg
            key="check"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={tacSpring.light}
          >
            <path d="M3 8l3.5 3.5 6.5-7" />
          </motion.svg>
        ) : icon ? (
          <motion.span
            key="icon"
            className="[&>svg]:w-4 [&>svg]:h-4"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={tacSpring.default}
          >
            {icon}
          </motion.span>
        ) : (
          <motion.span
            key={`num-${index}`}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={tacSpring.default}
          >
            {index + 1}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/** Internal label for horizontal layout. */
function StepLabel({
  title,
  description,
  status,
  className,
}: {
  title: string;
  description?: string;
  status?: 'completed' | 'active' | 'pending';
  className?: string;
}) {
  const { activeStep } = useContext(StepperContext);
  const { index } = useContext(StepIndexContext);

  const resolvedStatus = status ?? (index < activeStep ? 'completed' : index === activeStep ? 'active' : 'pending');
  const isHighlighted = resolvedStatus === 'completed' || resolvedStatus === 'active';

  return (
    <div className={className}>
      <p
        className={cn(
          'text-sm font-medium leading-tight',
          isHighlighted ? 'text-[var(--foreground)]' : 'text-[var(--muted-foreground)]',
        )}
      >
        {title}
      </p>
      {description && <p className="text-xs text-[var(--muted-foreground)] mt-0.5 leading-tight">{description}</p>}
    </div>
  );
}

/**
 * Individual step within a Stepper. Auto-detects its index and state from context.
 * @example
 * <Step title="Account" description="Set up your account" />
 */
export interface StepProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Step title text. */
  title: string;
  /** Optional description below the title. */
  description?: string;
  /** Override the step's visual state. */
  status?: 'completed' | 'active' | 'pending';
  /** Icon to display instead of step number. */
  icon?: React.ReactNode;
}

export const Step = forwardRef<HTMLDivElement, StepProps>(
  ({ title, description, status, icon, className, ...props }, ref) => {
    const { activeStep } = useContext(StepperContext);
    const { index } = useContext(StepIndexContext);

    const resolvedStatus: 'completed' | 'active' | 'pending' =
      status ?? (index < activeStep ? 'completed' : index === activeStep ? 'active' : 'pending');

    const isCompleted = resolvedStatus === 'completed';
    const isActive = resolvedStatus === 'active';

    return (
      <div ref={ref} className={cn('flex flex-row items-start gap-3', className)} {...props}>
        {/* Circle */}
        <motion.div
          className={cn(
            'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium shrink-0 border-[1.5px] border-solid',
            isCompleted && 'bg-[var(--point)] border-[var(--point)] text-[var(--point-foreground)]',
            isActive && 'border-[var(--point)] text-[var(--point)] bg-transparent',
            !isCompleted && !isActive && 'bg-[var(--secondary)] border-transparent text-[var(--muted-foreground)]',
          )}
          animate={isActive ? { scale: 1, boxShadow: 'none' } : { scale: 1, boxShadow: 'none' }}
          transition={tacSpring.default}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isCompleted ? (
              <motion.svg
                key="check"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={tacSpring.light}
              >
                <path d="M3 8l3.5 3.5 6.5-7" />
              </motion.svg>
            ) : icon ? (
              <motion.span
                key="icon"
                className="[&>svg]:w-4 [&>svg]:h-4"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={tacSpring.default}
              >
                {icon}
              </motion.span>
            ) : (
              <motion.span
                key={`num-${index}`}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={tacSpring.default}
              >
                {index + 1}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Label */}
        <div className="flex flex-col pt-1">
          <span
            className={cn(
              'text-sm font-medium',
              isCompleted || isActive ? 'text-[var(--foreground)]' : 'text-[var(--muted-foreground)]',
            )}
          >
            {title}
          </span>
          {description && <span className="text-xs text-[var(--muted-foreground)] mt-0.5">{description}</span>}
        </div>
      </div>
    );
  },
);
Step.displayName = 'Step';
