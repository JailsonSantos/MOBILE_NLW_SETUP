import { useState } from "react";
import colors from "tailwindcss/colors";
import { Feather } from '@expo/vector-icons';
import { Checkbox } from "../components/Checkbox";
import { BackButton } from "../components/BackButton";
import { ScrollView, View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { api } from "../lib/axios";

const availableWeekDays = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado'
]

export function New() {

  const [title, setTitle] = useState('');
  const [weekDays, setWeekDays] = useState<number[]>([]);

  function handleToggleWeekDay(weekDayIndex: number) {

    if (weekDays.includes(weekDayIndex)) {
      setWeekDays(prevState => prevState.filter(weekDay => weekDay !== weekDayIndex));
    } else {
      setWeekDays(prevState => [...prevState, weekDayIndex]);
    }
  }

  async function handleCreateNewHabit() {
    try {
      if (!title.trim() || weekDays.length === 0) {
        Alert.alert('Novo Hábito', 'Informe o nome do hábito e escolha os dias da semana.')
      }

      await api.post('/habits', { title, weekDays });

      setTitle('');
      setWeekDays([]);

      Alert.alert('Novo Hábito', 'Hábito criado com sucesso!')

    } catch (error) {
      console.log(error);
      Alert.alert('Ops', 'Não foi possível criar o novo hábito.')
    }
  }
  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton />

        <Text className="mt-6 text-white font-extrabold text-3xl">
          Criar hábito
        </Text>

        <Text className="mt-6 text-white font-semibold text-base">
          Qual o seu comprometimento?
        </Text>

        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholderTextColor={colors.zinc[400]}
          placeholder="Ex.: Exercícios, dormir bem, etc..."
          className="h-12 pl-4 rounded-lg mt-3 bg-zinc-900 text-white border-2 border-zinc-800 focus:border-green-600"
        />

        <Text className="mt-4 mb-3 text-white font-semibold text-base">
          Qual a recorrência?
        </Text>

        {
          availableWeekDays.map((weekDay, index) => (
            <Checkbox
              key={weekDay}
              title={weekDay}
              checked={weekDays.includes(index)}
              onPress={() => handleToggleWeekDay(index)}
            />
          ))
        }

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleCreateNewHabit}
          className="w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md mt-6"
        >
          <Feather
            size={20}
            name="check"
            color={colors.white}
          />
          <Text className="font-semibold text-base text-white ml-2">
            Confirmar
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  )
}