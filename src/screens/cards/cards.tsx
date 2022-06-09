import React, { useCallback, useEffect, useState } from 'react';
import { Image, Alert, Share, Animated, Easing } from 'react-native';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useMutation, useQuery } from '@apollo/client';

import HeaderLogo from '../../../assets/icons/logo.png';
import AddIcon from '../../../assets/icons/add-1x.png';
import CloseIcon from '../../../assets/icons/close.png';
import ShareIcon from '../../../assets/icons/share.png';
import DuplicateIcon from '../../../assets/icons/duplicate.png';
import DeleteIcon from '../../../assets/icons/delete.png';
import { Colors } from '../../components/theme/colors';
import {
  ActionIcon,
  ActionLink,
  CardList,
  ListItemContainer,
  ListItemLeft,
  ListItemRight,
} from '../../components/card-list/card-list';
import { Button } from '../../components/button/button';
import { CardListDto, QUERY_GET_CARDS } from '../../graphql/queries/get-cards';
import { MUTATION_CREATE_CARD } from '../../graphql/mutations/create-card';
import { BlurView } from 'expo-blur';
import { TextStyle6 } from '../../components/theme/theme';
import { Fonts } from '../../components/theme/fonts';
import { MUTATION_DUPLICATE_CARD } from '../../graphql/mutations/duplicate-card';
import { MUTATION_DELETE_CARD } from '../../graphql/mutations/delete-card';
import { MUTATION_SHARE_CARD } from '../../graphql/mutations/share-card';

const RootContainer = styled.View`
  background-color: ${Colors.BACKGROUND_GRAY};
  flex: 1;
`;

const ContentContainer = styled.SafeAreaView`
  flex: 1;
  margin-left: 18px;
  margin-right: 18px;
`;

const FooterButtonContainer = styled.View`
  position: absolute;
  bottom: 40px;
  margin-left: 18px;
  margin-right: 18px;
  left: 0;
  right: 0;
  shadow-color: ${Colors.GREYISH_40};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.8;
  shadow-radius: 2px;
  elevation: 1;
`;

const FooterContainer = styled.SafeAreaView`
  background-color: ${Colors.WHITE};
  bottom: 0px;
  left: 0;
  right: 0;
`;

const FooterBar = styled.View`
  height: 40px;
  width: 100%;
  background-color: ${Colors.WHITE};
  shadow-color: rgba(0, 0, 0, 0.1);
  shadow-offset: 0px 0px;
  shadow-radius: 15px;
  shadow-opacity: 1;
`;

const MoreOptionsContainer = styled.View`
  margin-left: auto;
  margin-rigt: 7px;
  margin-top: 15px;
`;

// const MoreOptionsContainer = Animated.View;

const MoreOption = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const MoreOptionText = styled.Text`
  font-size: 15px;
  font-family: ${Fonts.ProximaNovaABold};
  color: ${Colors.GREEN_TEAL};
`;

const MoreOptionIcon = styled.Image`
  margin-left: auto;
`;

export function CardsScreen() {
  const [itemMoreRevealed, setItemMoreRevealed] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<CardListDto>();

  const onItemMorePressed = useCallback(
    (item: CardListDto) => {
      setSelectedItem(item);
      setItemMoreRevealed(true);
    },
    [setSelectedItem, setItemMoreRevealed]
  );

  const onItemMoreClosePressed = useCallback(() => {
    setSelectedItem(undefined);
    setItemMoreRevealed(false);
  }, [setSelectedItem, setItemMoreRevealed]);

  const {
    loading: getCardsLoading,
    error: getCardsError,
    data,
    refetch: refetchCards,
  } = useQuery(QUERY_GET_CARDS);

  const [
    createCard,
    {
      data: createdCardData,
      loading: createCardLoading,
      error: createdCardError,
    },
  ] = useMutation(MUTATION_CREATE_CARD, {
    refetchQueries: [{ query: QUERY_GET_CARDS }],
  });

  const [
    duplicateCard,
    {
      data: duplicatedCardData,
      loading: duplicateCardLoading,
      error: duplicatedCardError,
    },
  ] = useMutation(MUTATION_DUPLICATE_CARD, {
    refetchQueries: [{ query: QUERY_GET_CARDS }],
    variables: { id: selectedItem?.id },
  });
  const [
    deleteCard,
    {
      data: deletedCardData,
      loading: deleteCardLoading,
      error: deletedCardError,
    },
  ] = useMutation(MUTATION_DELETE_CARD, {
    refetchQueries: [{ query: QUERY_GET_CARDS }],
  });

  const [
    shareCard,
    { data: sharedCardData, loading: shareCardLoading, error: sharedCardError },
  ] = useMutation(MUTATION_SHARE_CARD, {
    refetchQueries: [{ query: QUERY_GET_CARDS }],
  });

  const onAddNewPressed = useCallback(() => {
    if (!createCardLoading) {
      createCard({
        variables: {
          data: {
            name: `Food category (${Math.floor(new Date().getTime() / 1000)})`,
            minPrice: null,
            maxPrice: null,
            locationTypeIds: [],
            locationCuisineTypeIds: [],
            dishTypeIds: [],
            courseTypeIds: [],
            dietIds: [],
            excludedIngredientIds: [],
          },
        },
      });
    }
  }, [createCard, createCardLoading]);

  const onDeleteItemPressed = useCallback(() => {
    if (selectedItem) {
      Alert.alert(
        'Confirm delete',
        'This will delete Food Style and all its settings.',
        [
          {
            text: 'Delete',
            onPress: () => {
              deleteCard({ variables: { id: selectedItem.id } });
              setItemMoreRevealed(false);
              setSelectedItem(undefined);
            },
            style: 'destructive',
          },
          {
            text: 'Cancel',
            onPress: undefined,
            style: 'default',
          },
        ]
      );
    }
  }, [selectedItem, setSelectedItem, setItemMoreRevealed, deleteCard]);

  const onDuplicateItemPressed = useCallback(() => {
    if (selectedItem) {
      duplicateCard({ variables: { id: selectedItem.id } });
      setItemMoreRevealed(false);
      setSelectedItem(undefined);
    }
  }, [selectedItem, duplicateCard]);

  const onShareItemPressed = useCallback(() => {
    if (selectedItem && !sharedCardData?.shareCard) {
      shareCard({ variables: { id: selectedItem.id } });
    }

    if (sharedCardData?.shareCard) {
      Share.share({
        url: `https://cards.foodstyles.com/${sharedCardData?.shareCard}`,
      });
    }
  }, [selectedItem, sharedCardData, shareCard]);

  return (
    <>
      <RootContainer>
        <LinearGradient
          start={[0, 0]}
          end={[1, 0]}
          colors={[Colors.ORANGISH, Colors.MAIZE]}
          style={{
            width: '100%',
            height: 157,
            position: 'absolute',
            marginBottom: 32,
          }}
        />

        <ContentContainer>
          <Image
            source={HeaderLogo}
            style={{ width: 22, height: 26, marginBottom: 32 }}
          />
          <CardList
            data={data?.cards}
            loading={getCardsLoading}
            reload={refetchCards}
            onItemMorePressed={onItemMorePressed}
          />
        </ContentContainer>

        <FooterContainer>
          <FooterBar />

          <FooterButtonContainer>
            <Button
              text="New Food Style"
              iconLeftSource={AddIcon}
              onPress={onAddNewPressed}
            />
          </FooterButtonContainer>
        </FooterContainer>
      </RootContainer>

      {itemMoreRevealed && !!selectedItem && (
        <BlurView
          intensity={50}
          style={{
            flex: 1,
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            paddingLeft: 18,
            paddingRight: 18,
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ListItemContainer>
            <ListItemLeft>
              <TextStyle6>{selectedItem.name}</TextStyle6>
            </ListItemLeft>
            <ListItemRight>
              <ActionLink onPress={onItemMoreClosePressed}>
                <ActionIcon source={CloseIcon} />
              </ActionLink>
            </ListItemRight>
          </ListItemContainer>
          <MoreOptionsContainer>
            <MoreOption onPress={onShareItemPressed}>
              <MoreOptionText>Share</MoreOptionText>
              <MoreOptionIcon source={ShareIcon} />
            </MoreOption>
            <MoreOption onPress={onDuplicateItemPressed}>
              <MoreOptionText>Duplicate</MoreOptionText>
              <MoreOptionIcon source={DuplicateIcon} />
            </MoreOption>
            <MoreOption onPress={onDeleteItemPressed}>
              <MoreOptionText>Delete</MoreOptionText>
              <MoreOptionIcon source={DeleteIcon} />
            </MoreOption>
          </MoreOptionsContainer>
        </BlurView>
      )}
    </>
  );
}
