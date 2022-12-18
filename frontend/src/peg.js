// setting color values yellow from mui including dark mode
export const colorPalette = {
  grey: {
    0: "#B1B1B3",
    10: "#F6F6F6",
    50: "#9EAAB8",
    100: "#E0E0E0",
    200: "#AEAFB0",
    300: "#6F757C",
    400: "#626363",
    500: "#374F57",
    600: "#2A3C42",
    700: "#262626",
    800: "#1F242E",
    900: "#0A0A0A",
    1000: "#000000",
  },

  primary: {
    50: "#E6FBFF",
    100: "#CCF7FE",
    200: "#FFF59D", //yellow
    300: "#FFF176",
    400: "#FFEE58",
    500: "#FFEB3B",
    600: "#FDD835",
    700: "#FBC02D",
    800: "#00353F", //bluish gray-teal-dark
    900: "#001519",
  },
};

//mounting the color palette to the theme
export const colorSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              dark: colorPalette.primary[200],
              main: colorPalette.primary[500],
              light: colorPalette.primary[800],
            },
            neutral: {
              dark: colorPalette.grey[100],
              main: colorPalette.grey[200],
              mediumMain: colorPalette.grey[300],
              medium: colorPalette.grey[400],
              light: colorPalette.grey[700],
            },
            background: {
              default: colorPalette.grey[900],
              alt: colorPalette.grey[800],
            },
          }
        : {
            // palette values for light mode
            primary: {
              dark: colorPalette.primary[700],
              main: colorPalette.primary[500],
              light: colorPalette.primary[50],
            },
            neutral: {
              dark: colorPalette.grey[700],
              main: colorPalette.grey[500],
              mediumMain: colorPalette.grey[400],
              medium: colorPalette.grey[300],
              light: colorPalette.grey[50],
            },
            background: {
              default: colorPalette.grey[10],
              alt: colorPalette.grey[0],
            },
          }),
    },
    typography: {
      fontFamily: ["Fjalla One", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Questrial", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Questrial", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Questrial", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Questrial", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};

