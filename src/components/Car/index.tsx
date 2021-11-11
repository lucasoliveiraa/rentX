import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { CarDTO } from '../../dtos/CarDTO';

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

import {
  Container,
  Details,
  Brand,
  Name,
  About,
  Rent,
  Prediod,
  Price,
  Type,
  CarImage,
} from './styles';

interface Props extends RectButtonProps {
  data: CarDTO;
}

export function Car({ data, ...rest }: Props) {
  const MotorIcon = getAccessoryIcon(data.fuel_type);

  return (
    <Container {...rest}>
      <Details>
        <Brand>{data.brand}</Brand>
        <Name>{data.name}</Name>

        <About>
          <Rent>
            <Prediod>{data.rent.period}</Prediod>
            <Price>{`R$ ${data.rent.price}`}</Price>
          </Rent>
        
          <Type>
            <MotorIcon />
          </Type>
        </About>
      </Details>

      <CarImage 
        resizeMode="contain" 
        source={{ uri: data.thumbnail }} 
      />
    </Container>
  )
}