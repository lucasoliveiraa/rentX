import React, { useEffect, useState } from "react";
import { StatusBar, Alert } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import { CarDTO } from "../../dtos/CarDTO";
import { useNetInfo } from "@react-native-community/netinfo";
import { synchronize } from "@nozbe/watermelondb/sync";
import { database } from "../../database";
import { Car as ModelCar } from "../../database/model/Car";
import api from "../../services/api";

import Logo from "../../assets/logo.svg";

import { Car } from "../../components/Car";
import { LoadAnimation } from "../../components/LoadAnimation";

import { Container, Header, HeaderContent, TotalCars, CarList } from "./styles";

type NavigationProps = {
  navigate: (screen: string, {}) => void;
};

export function Home() {
  const [cars, setCars] = useState<ModelCar[]>([]);
  const [loading, setLoading] = useState(true);

  const netInfo = useNetInfo();
  const navigation = useNavigation<NavigationProps>();

  function handleCarDetails(car: CarDTO) {
    navigation.navigate("CarDetails", { car });
  }

  async function offlineSynchronize() {
    await synchronize({
      database,
      pullChanges: async ({ lastPulledAt }) => {
        const response = await api.get(
          `cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`
        );

        const { changes, lastedVersion } = response.data;
        return { changes, timestamp: lastedVersion };
      },
      pushChanges: async ({ changes }) => {
        const user = changes.users;
        await api.post("/users/sync", user);
      },
    });
  }

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        const carCollection = database.get<ModelCar>("cars");
        const cars = await carCollection.query().fetch();
        if (isMounted) {
          setCars(cars);
        }
      } catch (error) {
        console.log(error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (netInfo.isConnected === true) {
      offlineSynchronize();
    }
  }, [netInfo.isConnected]);

  useEffect(() => {
    if (netInfo.isConnected) {
      Alert.alert("Você está online");
    } else {
      Alert.alert("Você está offline");
    }
  }, [netInfo.isConnected]);

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />

          {!loading && <TotalCars>Total de {cars.length} carros</TotalCars>}
        </HeaderContent>
      </Header>

      {loading ? (
        <LoadAnimation />
      ) : (
        <CarList
          data={cars}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Car data={item} onPress={() => handleCarDetails(item)} />
          )}
        />
      )}
    </Container>
  );
}
