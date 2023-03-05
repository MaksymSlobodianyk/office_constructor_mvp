export const deskRotation = {
    'D0': 0,
    'D90': 90,
    'D180': 180,
    'D270': 270
}

export const deskStatus = {
    'VACANT': 'VACANT',
    'BOOKED': 'BOOKED',
    'PERMANENTLY_BOOKED': 'PERMANENTLY_BOOKED'
}

export const statusColor = {
    [deskStatus.VACANT]: {
        text: '#ffffff',
        desk: '#24a148',
        seat: '#1f6037'
    },
    [deskStatus.BOOKED]: {
        text: '#ffffff',
        desk: '#d7d8d9',
        seat: '#7a7c80'
    },
    [deskStatus.PERMANENTLY_BOOKED]: {
        text: '#ffffff',
        desk: '#0038e5',
        seat: '#0e2c85'
    }
}

export const arcDegree = {
    'd0': 0,
    'd90': 1.57,// π/2
    'd180': 3.14, // π
    'd270': 4.71// 3π/2
}

export const sizesConfig = {
    deskWidth: 60,
    deskHeight: 36,
    seatWidth: 24,
    seatHeight: 16,
    crossSide: 13
}