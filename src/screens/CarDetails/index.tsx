import React from 'react';
import { StatusBar } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CarDTO } from '../../dtos/CarDTO';

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Button } from '../../components/Button';

import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  About,
  Acessories,
  Footer,
} from './styles';

type NavigationProps = {
  navigate: (screen: string) => void;
  goBack: () => void;
}

interface Params {
  car: CarDTO;
}

export function CarDetails() {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute();
  const { car } = route.params as Params;

  function handleScheduling() {
    navigation.navigate('Scheduling');
  }

  function handleBack() {
    navigation.goBack();
  }

  return (
    <Container>
      <StatusBar 
        barStyle='dark-content' 
        backgroundColor='transparent' 
        translucent 
      />
      <Header>
        <BackButton onPress={handleBack} />
      </Header>

      <CarImages>
        <ImageSlider 
          imagesUrl={car.photos} 
        />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>R$ {car.rent.price}</Price>
          </Rent>
        </Details>

        <Acessories>
          { car.accessories.map(accessory => (
              <Accessory 
                key={accessory.type}
                name={accessory.name} 
                icon={getAccessoryIcon(accessory.type)} 
              />
          ))}
        </Acessories>

        <About>
          {car.about}
        </About>
      </Content>
      
      <Footer>
        <Button title="Escolher período do aluguel" onPress={handleScheduling} />
      </Footer>
    </Container>
  )
}