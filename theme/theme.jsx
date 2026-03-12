import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: `'Inter', sans-serif`,
    body: `'Inter', sans-serif`,
  },
  colors: {
    brand: {
      50: "#e3f2fd",
      100: "#bbdefb",
      500: "#2196f3", // Primary Blue Accent
      600: "#1e88e5", // Hover State Blue
      900: "#0d47a1", // Deep Blue for Text/Headings
    },
    surface: {
      white: "#FFFFFF",
      gray: "#F7FAFC", // For subtle background contrast behind white cards
    }
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "bold",
        borderRadius: "lg", // Modern rounded corners
      },
      variants: {
        solid: {
          bg: "brand.500",
          color: "white",
          _hover: {
            bg: "brand.600",
            transform: "translateY(-1px)", // Smooth interaction
            boxShadow: "md",
          },
        },
      },
    },
    Card: {
      baseStyle: {
        bg: "surface.white",
        boxShadow: "sm",
        borderRadius: "xl",
      }
    }
  },
});

export default theme;