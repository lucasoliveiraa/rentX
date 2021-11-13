import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import { StatusBar } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';

import { getPlatformDate } from '../../utils/getPlatformDate';
import { CarDTO } from '../../dtos/CarDTO';
import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { Calendar, DayProps, MarkedDateProps } from '../../components/Calendar';
import { generateInterval } from '../../components/Calendar/generateInterval';

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
  navigate: (screen: string, {}) => void;
  goBack: () => void;
}

interface RentalPeriod {
  startFormatted: string;
  endFormatted: string;
}

interface Params {
  car: CarDTO;
}

export function Scheduling() {
  const [ lastSelectedDate, setLastSelectedDate ] = useState<DayProps>({} as DayProps);
  const [ markedDates, setMarkedDates ] = useState<MarkedDateProps>({} as MarkedDateProps);
  const [ rentalPeriod, setRentalPeriod ] = useState<RentalPeriod>({} as RentalPeriod)

  const theme = useTheme();
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute();
  const { car } = route.params as Params;

  function handleConfirmRentalPeriod() {
    navigation.navigate('SchedulingDetails', {
      car,
      dates: Object.keys(markedDates),
    });
  }

  function handleBack() {
    navigation.goBack();
  }

  function handleChangeDate(date: DayProps) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;

    if (start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }

    setLastSelectedDate(end);
    const interval = generateInterval(start, end);
    setMarkedDates(interval);

    const firstDate = Object.keys(interval)[0];
    const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

    setRentalPeriod({
      startFormatted: format(getPlatformDate(new Date(firstDate)), 'dd/MM/yyyy'),
      endFormatted: format(getPlatformDate(new Date(endDate)), 'dd/MM/yyyy'),
    })
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
        onPress={handleBack} 
        />

        <Title>
          Escolha uma {'\n'} 
          data de início e {'\n'}
          fim do aluguel {'\n'}         
        </Title>

        <RentalPeriod>
          <DateInfo selected={!!rentalPeriod.startFormatted}>
            <DateTitle>DE</DateTitle>
            <DateValue >{rentalPeriod.startFormatted}</DateValue>
          </DateInfo>

          <ArrowSvg />

          <DateInfo selected={!!rentalPeriod.startFormatted}>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>{rentalPeriod.endFormatted}</DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar 
          markedDates={markedDates}
          onDayPress={handleChangeDate}
        />
      </Content>

      <Footer>
        <Button
          title="Confirmar"
          onPress={handleConfirmRentalPeriod}
          enabled={!!rentalPeriod.startFormatted}
        />
      </Footer>
    </Container>
  );
}