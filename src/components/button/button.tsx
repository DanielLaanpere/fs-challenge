import React from 'react';
import { GestureResponderEvent } from 'react-native';
import styled from 'styled-components/native';
import { Colors } from '../theme/colors';
import { TextStyle7 } from '../theme/theme';

const ButtonContainer = styled.TouchableOpacity`
  width: 100%;
  background-color: ${Colors.WHITE};
  border-radius: 6px;
  padding-top: 11px;
  padding-bottom: 11px;
  padding-left: 11px;
  padding-right: 11px;
  flex-direction: row;
  align-items: center;
`;

const IconLeft = styled.Image`
  width: 30px;
  height: 30px;
  margin-right: 11px;
`;

export interface ButtonProps {
  text: string;
  type?: 'primary' | 'secondary';
  iconLeftSource?: any;
  onPress?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  type = 'primary',
  iconLeftSource = null,
  text,
  onPress,
}) => {
  return (
    <ButtonContainer activeOpacity={0.9} onPress={onPress}>
      {!!iconLeftSource && <IconLeft source={iconLeftSource} />}
      <TextStyle7>{text}</TextStyle7>
    </ButtonContainer>
  );
};
