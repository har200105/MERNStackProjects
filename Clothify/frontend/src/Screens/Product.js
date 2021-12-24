import { Add, Remove } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { mobile } from "../responsive";
import axios from 'axios';
import { API } from '../API';
import { addProduct } from "../Redux/cartRedux";
import { useDispatch } from "react-redux";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  &:hover{
      background-color: #f8f4f4;
  }
`;

const Product = () => {
  const { id } = useLocation();
  const [product, setProduct] = useState({});
  const [quantity,setQuantity] = useState(0);
  const dispatch = useDispatch();
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");

  const handleProduct = () =>{
    dispatch(addProduct({...product,quantity,color,size}));
  } 

  const getProductDetails = async () => {
    await axios.get(`${API}/getProduct/${id}`).then((ds) => {
      if (ds.status === 201) {
        setProduct(ds.data);
      }
    })
  }

  useEffect(() => {
    getProductDetails();
  }, [id]);

  const handleQuantity = (type) =>{
    if(type==="dec"){
      setQuantity(quantity-1);
    }else{
      setQuantity(quantity+1);
    }
  }

  return (
    <Container>
      <Wrapper>
        <ImgContainer>
          <Image src={product.img} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.name}</Title>
          <Desc>
            {product.description}
          </Desc>
          <Price>₹ 20</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              {
                product?.color?.map((s) => (
                  <FilterColor color={s} />
                ))
              }
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize>
                {
                  product?.size?.map((s) => (
                    <FilterSizeOption>{s}</FilterSizeOption>
                  ))
                }
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Remove />
              <Amount>1</Amount>
              <Add />
            </AmountContainer>
            <Button>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Product;