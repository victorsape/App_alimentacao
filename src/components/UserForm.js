// src/components/UserForm.js
import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom' //importe useNavigate

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 3px;
`;

const Select = styled.select`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 3px;
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Button = styled.button`
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const UserForm = () => {
  const { setUser } = useContext(UserContext);
  const [form, setForm] = useState({
    nome: '',
    idade: '',
    peso: '',
    altura: '',
    sexo: '',
    objetivo: '',
    frequenciaCompras: '',
    restricoes: [],
    preferencias: [],
  });
  const navigate = useNavigate() ;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prevForm) => {
      if (type === 'checkbox') {
        const currentValue = prevForm[name];
        return {
          ...prevForm,
          [name]: checked
            ? [...currentValue, value]
            : currentValue.filter((item) => item !== value),
        };
      } else {
        return { ...prevForm, [name]: value };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser(form);
    navigate('/meal-planner'); // Redireciona para o MealPlanner
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormGroup>
        <Label htmlFor="nome">Nome:</Label>
        <Input
          type="text"
          id="nome"
          name="nome"
          value={form.nome}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="idade">Idade:</Label>
        <Input
          type="number"
          id="idade"
          name="idade"
          value={form.idade}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="peso">Peso (kg):</Label>
        <Input
          type="number"
          id="peso"
          name="peso"
          value={form.peso}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="altura">Altura (cm):</Label>
        <Input
          type="number"
          id="altura"
          name="altura"
          value={form.altura}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label>Sexo:</Label>
        <RadioGroup>
          <RadioLabel>
            <input
              type="radio"
              name="sexo"
              value="masculino"
              checked={form.sexo === 'masculino'}
              onChange={handleChange}
              required
            />
            Masculino
          </RadioLabel>
          <RadioLabel>
            <input
              type="radio"
              name="sexo"
              value="feminino"
              checked={form.sexo === 'feminino'}
              onChange={handleChange}
              required
            />
            Feminino
          </RadioLabel>
        </RadioGroup>
      </FormGroup>
      <FormGroup>
        <Label htmlFor="objetivo">Objetivo:</Label>
        <Select
          id="objetivo"
          name="objetivo"
          value={form.objetivo}
          onChange={handleChange}
        >
          <option value="">Selecione</option>
          <option value="perder_peso">Perder Peso</option>
          <option value="ganhar_massa">Ganhar Massa Muscular</option>
          <option value="manter_peso">Manter Peso</option>
        </Select>
      </FormGroup>
      <FormGroup>
        <Label htmlFor="frequenciaCompras">Frequência de Compras:</Label>
        <Select
          id="frequenciaCompras"
          name="frequenciaCompras"
          value={form.frequenciaCompras}
          onChange={handleChange}
        >
          <option value="">Selecione</option>
          <option value="semanal">Semanal</option>
          <option value="quinzenal">Quinzenal</option>
          <option value="mensal">Mensal</option>
        </Select>
      </FormGroup>
      <FormGroup>
        <Label>Restrições Alimentares:</Label>
        <CheckboxGroup>
          <CheckboxLabel>
            <input
              type="checkbox"
              name="restricoes"
              value="gluten"
              checked={form.restricoes.includes('gluten')}
              onChange={handleChange}
            />
            Glúten
          </CheckboxLabel>
          <CheckboxLabel>
            <input
              type="checkbox"
              name="restricoes"
              value="lactose"
              checked={form.restricoes.includes('lactose')}
              onChange={handleChange}
            />
            Lactose
          </CheckboxLabel>
          <CheckboxLabel>
            <input
              type="checkbox"
              name="restricoes"
              value="vegetariano"
              checked={form.restricoes.includes('vegetariano')}
              onChange={handleChange}
            />
            Vegetariano
          </CheckboxLabel>
        </CheckboxGroup>
      </FormGroup>
      <FormGroup>
        <Label>Preferências Alimentares:</Label>
        <CheckboxGroup>
          <CheckboxLabel>
            <input
              type="checkbox"
              name="preferencias"
              value="low_carb"
              checked={form.preferencias.includes('low_carb')}
              onChange={handleChange}
            />
            Low Carb
          </CheckboxLabel>
          <CheckboxLabel>
            <input
              type="checkbox"
              name="preferencias"
              value="rico_proteina"
              checked={form.preferencias.includes('rico_proteina')}
              onChange={handleChange}
            />
            Rico em Proteína
          </CheckboxLabel>
        </CheckboxGroup>
      </FormGroup>
      <Button type="submit">Salvar Perfil</Button>
    </FormContainer>
  );
};

export default UserForm;