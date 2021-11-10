import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';
import { CarDTO } from '../../dtos/CarDTO';
import api from '../../services/api';

import Logo from '../../assets/logo.svg';

import { Car } from '../../components/Car';

import {
  Container,
  Header,
  HeaderContent,
  TotalCars,
  CarList
} from './styles';
import { Load } from '../../components/Load';

type NavigationProps = {
  navigate: (screen: string) => void;
}

export function Home() {
  const [ cars, setCars ] = useState<CarDTO[]>([]);
  const [ loading, setLoading ] = useState(true);
  const navigation = useNavigation<NavigationProps>();

  useEffect(() => {
    async function loadData() {
      try {
        const response = await api.get('/cars');
        setCars(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  function handleCarDetails() {
    navigation.navigate('CarDetails');
  }

  return (
    <Container>
      <StatusBar 
        barStyle='light-content' 
        backgroundColor='transparent' 
        translucent 
      />
      <Header>
        <HeaderContent>
          <Logo 
            width={RFValue(108)}
            height={RFValue(12)}
          />

          <TotalCars>
            Total de 12 carros
          </TotalCars>
        </HeaderContent>
      </Header>

      { loading ? <Load /> :
        <CarList 
          data={cars}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Car data={item} onPress={handleCarDetails}/>
          )}
        />
      }
    </Container>
  );
}