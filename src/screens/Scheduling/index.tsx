import React from 'react';
import { useTheme } from 'styled-components';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { Calendar } from '../../components/Calendar';

import ArrowSvg from '../../assets/arrow.svg'

import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer,
} from './styles';

type NavigationProps = {
  navigate: (screen: string) => void;
}

export function Scheduling() {
  const theme = useTheme();

  const navigation = useNavigation<NavigationProps>();

  function handleSchedulingDetails() {
    navigation.navigate('SchedulingDetails');
  }
  
  return (
    <Container>
      <StatusBar 
        barStyle='light-content' 
        backgroundColor='transparent' 
        translucent 
      />
      <Header>
        <BackButton 
        color={theme.colors.shape}
        onPress={() => {}} 
        />

        <Title>
          Escolha uma {'\n'} 
          data de início e {'\n'}
          fim do aluguel {'\n'}         
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={true}>18/06/2021</DateValue>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected={false}></DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar />
      </Content>

      <Footer>
        <Button
          title="Confirmar"
          onPress={handleSchedulingDetails}
        />
      </Footer>
    </Container>
  );
}