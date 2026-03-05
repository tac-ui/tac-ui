import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { createDrawerNavigator, type DrawerContentComponentProps } from '@react-navigation/drawer';
import { NavigationContainer, type Theme as NavTheme } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTacNativeTheme, Button, Divider } from '@tac-ui/native';
import { Sun, Moon } from '@tac-ui/icon-native';
import { navGroups } from './nav-data';

// Screen imports
import HomeScreen from '../screens/HomeScreen';
import ButtonScreen from '../screens/actions/ButtonScreen';
import InputScreen from '../screens/form/InputScreen';
import TextareaScreen from '../screens/form/TextareaScreen';
import SelectScreen from '../screens/form/SelectScreen';
import ComboboxScreen from '../screens/form/ComboboxScreen';
import CheckboxScreen from '../screens/form/CheckboxScreen';
import RadioScreen from '../screens/form/RadioScreen';
import SwitchScreen from '../screens/form/SwitchScreen';
import SliderScreen from '../screens/form/SliderScreen';
import ToggleScreen from '../screens/form/ToggleScreen';
import SegmentControllerScreen from '../screens/form/SegmentControllerScreen';
import DatePickerScreen from '../screens/form/DatePickerScreen';
import ColorPickerScreen from '../screens/form/ColorPickerScreen';
import BadgeScreen from '../screens/data-display/BadgeScreen';
import AvatarScreen from '../screens/data-display/AvatarScreen';
import ChipScreen from '../screens/data-display/ChipScreen';
import ProgressScreen from '../screens/data-display/ProgressScreen';
import TableScreen from '../screens/data-display/TableScreen';
import IndicatorScreen from '../screens/data-display/IndicatorScreen';
import SkeletonScreen from '../screens/data-display/SkeletonScreen';
import CodeBlockScreen from '../screens/data-display/CodeBlockScreen';
import CardScreen from '../screens/data-display/CardScreen';
import EmptyStateScreen from '../screens/data-display/EmptyStateScreen';
import AlertScreen from '../screens/feedback/AlertScreen';
import SnackbarScreen from '../screens/feedback/SnackbarScreen';
import ToastScreen from '../screens/feedback/ToastScreen';
import DialogScreen from '../screens/feedback/DialogScreen';
import DividerScreen from '../screens/feedback/DividerScreen';
import TabsScreen from '../screens/navigation/TabsScreen';
import AccordionScreen from '../screens/navigation/AccordionScreen';
import StepperScreen from '../screens/navigation/StepperScreen';
import DropdownScreen from '../screens/navigation/DropdownScreen';
import FloatingMenuBarScreen from '../screens/navigation/FloatingMenuBarScreen';
import StackScreen from '../screens/layout/StackScreen';

const screenComponents: Record<string, React.ComponentType<any>> = {
  HomeScreen,
  ButtonScreen,
  InputScreen,
  TextareaScreen,
  SelectScreen,
  ComboboxScreen,
  CheckboxScreen,
  RadioScreen,
  SwitchScreen,
  SliderScreen,
  ToggleScreen,
  SegmentControllerScreen,
  DatePickerScreen,
  ColorPickerScreen,
  BadgeScreen,
  AvatarScreen,
  ChipScreen,
  ProgressScreen,
  TableScreen,
  IndicatorScreen,
  SkeletonScreen,
  CodeBlockScreen,
  CardScreen,
  EmptyStateScreen,
  AlertScreen,
  SnackbarScreen,
  ToastScreen,
  DialogScreen,
  DividerScreen,
  TabsScreen,
  AccordionScreen,
  StepperScreen,
  DropdownScreen,
  FloatingMenuBarScreen,
  StackScreen,
};

const Drawer = createDrawerNavigator();

function CustomDrawerContent({ navigation, state }: DrawerContentComponentProps) {
  const { theme, mode, toggleMode } = useTacNativeTheme();
  const insets = useSafeAreaInsets();
  const activeRouteName = state.routes[state.index]?.name;

  return (
    <View style={[styles.drawer, { backgroundColor: theme.colors.background, paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.drawerHeader}>
        <Text style={[styles.drawerTitle, { color: theme.colors.foreground }]}>Tac UI</Text>
        <Text style={[styles.drawerSubtitle, { color: theme.colors.mutedForeground }]}>Native Components</Text>
      </View>

      {/* Theme Toggle */}
      <View style={styles.themeToggle}>
        <Button
          variant="outline"
          size="sm"
          onPress={toggleMode}
          leftIcon={mode === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        >
          {mode === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </Button>
      </View>

      <Divider style={{ marginVertical: 8 }} />

      {/* Navigation */}
      <ScrollView style={styles.drawerScroll} showsVerticalScrollIndicator={false}>
        {/* Home */}
        <Pressable
          style={[styles.drawerItem, activeRouteName === 'HomeScreen' && { backgroundColor: theme.colors.muted }]}
          onPress={() => navigation.navigate('HomeScreen')}
        >
          <Text
            style={[
              styles.drawerItemText,
              { color: activeRouteName === 'HomeScreen' ? theme.colors.point : theme.colors.foreground },
            ]}
          >
            Home
          </Text>
        </Pressable>

        {/* Groups */}
        {navGroups.map((group) => (
          <View key={group.key} style={styles.drawerGroup}>
            <Text style={[styles.drawerGroupTitle, { color: theme.colors.mutedForeground }]}>{group.title}</Text>
            {group.items.map((item) => {
              const isActive = activeRouteName === item.screen;
              return (
                <Pressable
                  key={item.key}
                  style={[styles.drawerItem, isActive && { backgroundColor: theme.colors.muted }]}
                  onPress={() => navigation.navigate(item.screen)}
                >
                  <Text
                    style={[
                      styles.drawerItemText,
                      { color: isActive ? theme.colors.point : theme.colors.foreground },
                      isActive && { fontWeight: '600' },
                    ]}
                  >
                    {item.title}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        ))}
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

export function AppNavigator() {
  const { theme, mode } = useTacNativeTheme();

  const navTheme: NavTheme = {
    dark: mode === 'dark',
    colors: {
      primary: theme.colors.point,
      background: theme.colors.background,
      card: theme.colors.background,
      text: theme.colors.foreground,
      border: theme.colors.border,
      notification: theme.colors.point,
    },
    fonts: {
      regular: { fontFamily: 'System', fontWeight: '400' as const },
      medium: { fontFamily: 'System', fontWeight: '500' as const },
      bold: { fontFamily: 'System', fontWeight: '700' as const },
      heavy: { fontFamily: 'System', fontWeight: '800' as const },
    },
  };

  const allScreens: { name: string; component: React.ComponentType<any>; title: string }[] = [
    { name: 'HomeScreen', component: HomeScreen, title: 'Tac UI Native' },
  ];

  for (const group of navGroups) {
    for (const item of group.items) {
      const comp = screenComponents[item.screen];
      if (comp) {
        allScreens.push({ name: item.screen, component: comp, title: item.title });
      }
    }
  }

  return (
    <NavigationContainer theme={navTheme}>
      <Drawer.Navigator
        initialRouteName="HomeScreen"
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerStyle: { backgroundColor: theme.colors.background },
          headerTintColor: theme.colors.foreground,
          headerTitleStyle: { fontWeight: '600', fontSize: 17 },
          drawerStyle: { width: 280 },
        }}
      >
        {allScreens.map(({ name, component, title }) => (
          <Drawer.Screen key={name} name={name} component={component} options={{ title }} />
        ))}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  drawer: {
    flex: 1,
  },
  drawerHeader: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 4,
  },
  drawerTitle: {
    fontSize: 22,
    fontWeight: '700',
  },
  drawerSubtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  themeToggle: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  drawerScroll: {
    flex: 1,
  },
  drawerGroup: {
    marginTop: 16,
  },
  drawerGroupTitle: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    paddingHorizontal: 20,
    marginBottom: 4,
  },
  drawerItem: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  drawerItemText: {
    fontSize: 14,
    fontWeight: '400',
  },
});
