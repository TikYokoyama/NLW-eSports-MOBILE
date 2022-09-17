import { ImageBackground, ImageSourcePropType, TouchableOpacity, TouchableOpacityProps, Text } from 'react-native'; //torna clicavel
import { LinearGradient } from 'expo-linear-gradient';

import { THEME } from '../../theme';
import { styles } from './styles';

export interface GameCardProps {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number
  };
}

//para uso apenas nessa pagina, mas basicamente a mesma coisa
interface Props extends TouchableOpacityProps {
  data: GameCardProps;
}

//puxa todas as props que nao conheco do TouchableOpP.
export function GameCard({ data, ...rest }: Props) {
  
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <ImageBackground
        style={styles.cover}
        source={{ uri: data.bannerUrl }}
      >

        <LinearGradient
          colors={THEME.COLORS.FOOTER}
          style={styles.footer}
        >
          <Text style={styles.name}>
            {data.title}
          </Text>

          <Text style={styles.ads}>
            {data._count.ads} anuncios
          </Text>

        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
}