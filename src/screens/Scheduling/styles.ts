import styled, { css } from 'styled-components/native';
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';

interface DateValueProps {
  selected: boolean;
}

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_secondary};
`;

export const Header = styled.View`
  width: 100%;
  height: 325px;
  background-color: ${({ theme }) => theme.colors.header};
  justify-content: center;
  padding: 25px;
  padding-top: ${getStatusBarHeight() + 30}px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.secundary_600};
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(34)}px;
  margin-top: 24px;
`;

export const RentalPeriod = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
`;

export const DateInfo = styled.View<DateValueProps>`
  width: 30%;

  ${({ selected, theme }) => !selected && css`
    border-bottom-color: ${theme.colors.text};
    border-bottom-width: 2px;
    border-style: solid;
  `};
`;

export const DateTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.secundary_500};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(10)}px;
`;

export const DateValue = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_500};
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(15)}px;
  padding-bottom: 5px;
`;

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingBottom: 24
  },
  showsVerticalScrollIndicator: false,
})``;

export const Footer = styled.View`
  padding: 24px 24px ${getBottomSpace() + 24}px;
`;
