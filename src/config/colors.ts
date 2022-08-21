// SYNC_TO: /tailwind.config.js
type DensityToHEX = {
    [k: number]: string
}

type Colors = {
    main: string
    primary: DensityToHEX
    secondary: DensityToHEX
}

const colors: Colors = {
    main: '#fff',
    primary: {},
    secondary: {},
}

const densities = [100, 200, 300, 400, 500, 600, 700, 800, 900]

densities.forEach(density => {
    colors.primary[density] = density < 500 ? '#6d69b4' : '#9d9adc'
    colors.secondary[density] = density < 500 ? '#b0ace2' : '#6d69b4'
});

export { colors }