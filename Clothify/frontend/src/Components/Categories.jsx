import { useEffect, useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import CategoryItem from "./CategoryItem";
import axios from 'axios';
import {API} from '../API';

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  ${mobile({ padding: "0px", flexDirection:"column" })}

`;

const Categories = () => {

  const [categories,setCategories] = useState([]);

  const getCategories = async() =>{
    await axios.get(`${API}/getCategory`).then((ds)=>{
      if(ds.status===201){
        setCategories(ds.data);
      }
    })
  }

  useEffect(()=>{
    getCategories();
  },[categories]);
  
  return (
    <Container>
      {categories.map((item) => (
        <CategoryItem item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default Categories;
