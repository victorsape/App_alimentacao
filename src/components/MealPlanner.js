// src/components/MealPlanner.js
import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import foods from '../data/foods.json';
import styled from 'styled-components';

const PlannerContainer = styled.div`
  padding: 20px;
`;

const DayContainer = styled.div`
  margin-bottom: 20px;
  border: 1px solid #eee;
  padding: 15px;
  border-radius: 5px;
`;

const MealSection = styled.div`
  margin-bottom: 20px;
`;

const MealTitle = styled.h3`
  margin-top: 0;
`;

const FoodItem = styled.div`
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  padding: 8px;
  margin-bottom: 5px;
  border-radius: 3px;
`;

const AvailableFoods = styled.div`
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 3px;
  background-color: #f9f9f9;
`;

const AvailableFoodsTitle = styled.h4`
  margin-top: 0;
  margin-bottom: 5px;
`;

const FoodList = styled.ul`
  list-style: none;
  padding: 0;
`;

const FoodListItem = styled.li`
  padding: 5px 0;
  cursor: pointer;
  &:hover {
    background-color: #eee;
  }
`;

const MealPlanner = () => {
  const { user } = useContext(UserContext);
  const [dieta, setDieta] = useState({
    segunda: { cafe: [], almoco: [], jantar: [] },
    terca: { cafe: [], almoco: [], jantar: [] },
    quarta: { cafe: [], almoco: [], jantar: [] },
    quinta: { cafe: [], almoco: [], jantar: [] },
    sexta: { cafe: [], almoco: [], jantar: [] },
    sabado: { cafe: [], almoco: [], jantar: [] },
    domingo: { cafe: [], almoco: [], jantar: [] },
  });

  useEffect(() => {
    if (user) {
      console.log('Dados do usuário no MealPlanner:', user);
      // Aqui você poderá adicionar a lógica para sugerir refeições iniciais baseadas no usuário
    }
  }, [user]);

  const handleAddFoodToMeal = (day, meal, foodName) => {
    setDieta(prevDieta => ({
      ...prevDieta,
      [day]: {
        ...prevDieta[day],
        [meal]: [...prevDieta[day][meal], foodName],
      },
    }));
  };

  return (
    <PlannerContainer>
      <h2>Planejador de Refeições</h2>
      {Object.keys(dieta).map((day) => (
        <DayContainer key={day}>
          <h3>{day.charAt(0).toUpperCase() + day.slice(1)}</h3>
          {Object.keys(dieta[day]).map((meal) => (
            <MealSection key={meal}>
              <MealTitle>{meal.charAt(0).toUpperCase() + meal.slice(1)}</MealTitle>
              {dieta[day][meal].map((food, index) => (
                <FoodItem key={index}>{food}</FoodItem>
              ))}
              <AvailableFoods>
                <AvailableFoodsTitle>Adicionar Alimento:</AvailableFoodsTitle>
                <FoodList>
                  {foods.map((food) => (
                    <FoodListItem
                      key={food.id}
                      onClick={() => handleAddFoodToMeal(day, meal, food.nome)}
                    >
                      {food.nome}
                    </FoodListItem>
                  ))}
                </FoodList>
              </AvailableFoods>
            </MealSection>
          ))}
        </DayContainer>
      ))}
    </PlannerContainer>
  );
};

export default MealPlanner;

