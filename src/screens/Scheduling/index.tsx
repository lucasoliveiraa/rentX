import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

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
  navigate: (screen: string) => void;
  goBack: () => void;
}

export function Scheduling() {
  const [ lastSelectedDate, setLastSelectedDate ] = useState<DayProps>({} as DayProps);
  const [ markedDates, setMarkedDates ] = useState<MarkedDateProps>({} as MarkedDateProps);
  const theme = useTheme();
  const navigation = useNavigation<NavigationProps>();

  function handleSchedulingDetails() {
    navigation.navigate('SchedulingDetails');
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
        <Calendar 
          markedDates={markedDates}
          onDayPress={handleChangeDate}
        />
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