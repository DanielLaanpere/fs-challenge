import React, { useCallback, useMemo, useState } from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import { BlurView } from 'expo-blur';

import { Colors } from '../theme/colors';
import { TextStyle6 } from '../theme/theme';
import OptionsIcon from '../../../assets/icons/options.png';
import { CardListDto } from '../../graphql/queries/get-cards';

const Container = styled.View`
  flex: 1;
`;

export const ListItemContainer = styled.View`
  width: 100%;
  background-color: ${Colors.WHITE};
  shadow-color: ${Colors.GREYISH_40};
  shadow-offset: 0px 2px;
  shadow-radius: 7px;
  shadow-opacity: 1;
  border-radius: 6px;
  elevation: 1;
  justify-content: space-between;
  flex-direction: row;
  margin-bottom: 6px;
  padding-top: 14px;
  padding-bottom: 14px;
  padding-left: 18px;
  padding-right: 15px;
`;

export const ListItemLeft = styled.View`
  max-width: 80%;
`;

export const ListItemRight = styled.View``;

export const ActionIcon = styled.Image`
  width: 24px;
  height; 24px;
`;

export const ActionLink = styled.TouchableOpacity`
  padding-left; 14px;
`;

export const renderListItem = () => {
  return;
};

export interface CardListProps {
  data?: CardListDto[];
  loading?: boolean;
  reload?: () => void;
  onItemMorePressed?: (item: CardListDto) => void;
  setSelectedItem?: () => void;
}

export function CardList({
  data = [],
  loading,
  reload,
  onItemMorePressed,
}: CardListProps) {
  return (
    <Container>
      <FlatList
        refreshing={loading}
        onRefresh={reload}
        data={data}
        renderItem={({ item }: { item: CardListDto }) => (
          <ListItemContainer key={item.id}>
            <ListItemLeft>
              <TextStyle6>{item.name}</TextStyle6>
            </ListItemLeft>
            <ListItemRight>
              {!!onItemMorePressed && (
                <ActionLink onPress={() => onItemMorePressed(item)}>
                  <ActionIcon source={OptionsIcon} />
                </ActionLink>
              )}
            </ListItemRight>
          </ListItemContainer>
        )}
      />
    </Container>
  );
}
