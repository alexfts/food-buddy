const styles = theme => ({
  map: {
    width: '77%',
    height: '100%'
  }
});

export const snazzyMapsStyles = [
  {
    featureType: 'administrative',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#6195a0'
      }
    ]
  },
  {
    featureType: 'administrative.province',
    elementType: 'geometry.stroke',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'landscape',
    elementType: 'geometry',
    stylers: [
      {
        lightness: '0'
      },
      {
        saturation: '0'
      },
      {
        color: '#f5f5f2'
      },
      {
        gamma: '1'
      }
    ]
  },
  {
    featureType: 'landscape.man_made',
    elementType: 'all',
    stylers: [
      {
        lightness: '-3'
      },
      {
        gamma: '1.00'
      }
    ]
  },
  {
    featureType: 'landscape.man_made',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#f8f8f8'
      }
    ]
  },
  {
    featureType: 'landscape.natural.terrain',
    elementType: 'all',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'poi',
    elementType: 'all',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'poi',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'poi.attraction',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'poi.business',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'poi.government',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'poi.medical',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#e6f2da'
      },
      {
        visibility: 'on'
      }
    ]
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'poi.place_of_worship',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'poi.school',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'poi.sports_complex',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'road',
    elementType: 'all',
    stylers: [
      {
        saturation: -100
      },
      {
        lightness: 45
      },
      {
        visibility: 'simplified'
      }
    ]
  },
  {
    featureType: 'road.highway',
    elementType: 'all',
    stylers: [
      {
        visibility: 'simplified'
      }
    ]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#f9d6b5'
      },
      {
        visibility: 'simplified'
      }
    ]
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text',
    stylers: [
      {
        color: '#4e4e4e'
      }
    ]
  },
  {
    featureType: 'road.arterial',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#787878'
      }
    ]
  },
  {
    featureType: 'road.arterial',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'road.local',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'transit',
    elementType: 'all',
    stylers: [
      {
        visibility: 'simplified'
      }
    ]
  },
  {
    featureType: 'transit.line',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#e5e5e5'
      }
    ]
  },
  {
    featureType: 'transit.station.airport',
    elementType: 'labels.icon',
    stylers: [
      {
        hue: '#0a00ff'
      },
      {
        saturation: '-77'
      },
      {
        gamma: '0.57'
      },
      {
        lightness: '0'
      },
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'transit.station.bus',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'on'
      },
      {
        hue: '#008eff'
      }
    ]
  },
  {
    featureType: 'transit.station.rail',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#43321e'
      }
    ]
  },
  {
    featureType: 'transit.station.rail',
    elementType: 'labels.icon',
    stylers: [
      {
        hue: '#005dff'
      },
      {
        lightness: '4'
      },
      {
        gamma: '0.75'
      },
      {
        saturation: '-68'
      },
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'water',
    elementType: 'all',
    stylers: [
      {
        color: '#eaf6f8'
      },
      {
        visibility: 'on'
      }
    ]
  },
  {
    featureType: 'water',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#cbeefa'
      }
    ]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        lightness: '-49'
      },
      {
        saturation: '-53'
      },
      {
        gamma: '0.79'
      }
    ]
  },
  {
    featureType: 'water',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  }
];

export default styles;
