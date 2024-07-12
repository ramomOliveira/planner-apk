import clsx from "clsx";
import React, { createContext, useContext } from "react";
import {
  Text,
  TextProps,
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

type Variant = "primary" | "secondary";

type ButtonProps = TouchableOpacityProps & {
  variant?: Variant;
  isLoading?: boolean;
};

const ThemeContext = createContext<{ variant?: Variant }>({});

function Button({
  variant = "primary",
  isLoading,
  children,
  ...rest
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.base,
        variant === "primary" ? styles.primary : styles.secondary,
      ]}
      activeOpacity={0.7}
      disabled={isLoading}
      {...rest}
    >
      <ThemeContext.Provider value={{ variant: variant }}>
        {isLoading ? <ActivityIndicator className="text-lime-950" /> : children}
      </ThemeContext.Provider>
    </TouchableOpacity>
  );
}

function Title({ children, ...rest }: TextProps) {
  const { variant } = useContext(ThemeContext);
  return (
    <Text
      className={clsx("text-base font-semibold", {
        "text-lime-950": variant === "primary",
        "text-zinc-200": variant === "secondary",
      })}
      {...rest}
    >
      {children}
    </Text>
  );
}

Button.Title = Title;

const styles = StyleSheet.create({
  base: {
    width: "100%",
    height: 44,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    gap: 8,
  },
  primary: {
    backgroundColor: "#BEF264", // lime-300
  },
  secondary: {
    backgroundColor: "#27272A", // zinc-800
  },
});

export { Button };
