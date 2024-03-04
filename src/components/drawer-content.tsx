import { Image, ScrollView, Text, View } from "react-native";
import { DrawerContentComponentProps } from "@react-navigation/drawer";

import { CustomOptions } from "@/@types/navigation";

import { DrawerButton } from "@/components/drawer-button";

export function DrawerContent(drawerProps: DrawerContentComponentProps) {
  return (
    <View className="flex-1 bg-gray-600 overflow-hidden">
      <View className="mt-20 w-full border-b pb-6 border-gray-500">
        <Image
          className="w-28 ml-5"
          source={require("@/assets/logo.png")}
          resizeMode="contain"
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 42 }}
      >
        <View className="mt-2">
          {drawerProps.state.routes.map((route, index) => {
            const isFocused = drawerProps.state.index === index;
            const options = drawerProps.descriptors[route.key]
              .options as CustomOptions;

            if (options.title === undefined) {
              return;
            }

            const onPress = () => {
              const event = drawerProps.navigation.emit({
                type: "drawerItemPress",
                canPreventDefault: true,
                target: route.key,
              });

              if (!isFocused && !event?.defaultPrevented) {
                drawerProps.navigation.navigate(route.name, route.params);
              }
            };

            return (
              <View key={route.key}>
                {options.sectionTitle && (
                  <Text className="text-gray-400 text-base font-body ml-4 mt-6">
                    {options.sectionTitle}
                  </Text>
                )}

                <DrawerButton
                  onPress={onPress}
                  title={options.title}
                  iconName={options.iconName}
                  isDivider={options.isDivider}
                  isFocused={isFocused}
                />
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}
