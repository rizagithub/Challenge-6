import { useState, useEffect } from "react";
import {Button, Typography, Row, Col, Card, Breadcrumb, Layout, Menu} from 'antd';
import Cars from './Cars';
import CarsList from '../components/CarsList';
import Footer from './Footer';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

const id = getRandomInt(1, 100);

function CarsPage() {

  const [items, setItem] = useState(null);
  const [save, setSave] = useState(null);

  useEffect(() => {
    fetch(`https://raw.githubusercontent.com/fnurhidayat/probable-garbanzo/main/data/cars.min.json`)
      .then((response) => response.json())
      .then((data) => setItem(data))
      .catch((err) => console.error(err));
  }, []);

  const colMax = 4;
  let count = 1;

  let gridDisplay = [];
  let gridRow = [];
  items?.map((item) => {
    if (count % colMax === 0) {
      gridDisplay.push(gridRow);
      gridRow = [];
    }
    else {
      gridRow.push(item);
    }
    count++;
  });

  const reset = () => {
    setItem(save);
  }

  const yangAvailable = ()=>{
    setSave(items);
    const available = items?.filter((item)=>item.available === true);
    setItem(available);
    console.log(save)
  }

  const items1 = ['1', '2', '3'].map((key) => ({
    key,
    label: `nav ${key}`,
  }));

  return (
    <div className="CarsPage">
      <Cars></Cars>
      <CarsList></CarsList>
      <Footer></Footer>  
    </div>
  );
}

export default CarsPage;
