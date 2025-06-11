export const getVisibleStatusesByRole = (roleId: number): number[] => {
  switch (roleId) {
    case 6: // FINANCIERA_ASES
      return [1,4];
    case 5: // FINANCIERA_EJEC
      return [3,2,5,6];
    case 4: // FINANCIERA_ADM
      return [1, 2, 3, 4, 5, 6];
    default:
      return [];
  }
};


/**
 * [
  {
    "id": 1,
    "contractStatusDesc": "RESERVA"
  },
  {
    "id": 2,
    "contractStatusDesc": "ACTIVO"
  },
  {
    "id": 3,
    "contractStatusDesc": "INACTIVO"
  },
  {
    "id": 4,
    "contractStatusDesc": "PENDIENTE DE DOCUMENTACION"
  },
  {
    "id": 5,
    "contractStatusDesc": "EN PROCESO"
  },
  {
    "id": 6,
    "contractStatusDesc": "CANCELADO"
  }
]
 
 */