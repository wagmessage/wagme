import React, { useEffect, useState } from 'react';
import { ethers, BigNumber } from 'ethers';
import stars from '../assets/stars.png';
import stars2 from '../assets/stars2.png';
import moon from '../assets/moon.png';
import rock from '../assets/rock.png';
import masjid from '../assets/masjid.png';
import bottom from '../assets/bottom.png';
import lamp from '../assets/lamp.png';
import SaveSnailz from './SaveSnailz.json';

import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from 'wagmi';


import './Home.css';

const SaveSnailzAdderss = "0xbB49D51b4A8993e804f6D9AF9cB2b18daf7d09A2";



const Home = () => {
  
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const [totalMinted, setTotalMinted] = React.useState(0n);
  const { isConnected } = useAccount();

  async function handleMint() {
    if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
            SaveSnailzAdderss,
            SaveSnailz.abi,
            signer
        );
        try {
            const response = await contract.mint(BigNumber.from(mounted),{
                value: ethers.utils.parseEther((0.0029 * mounted).toString()),
            });
            console.log('response' , response);
        } catch (err) {
            console.log("error: ", err)
        }
    }
}

  const { data: totalSupplyData } = useContractRead({
    address: '0xbB49D51b4A8993e804f6D9AF9cB2b18daf7d09A2',
    abi: SaveSnailz.abi,
    functionName: 'totalSupply',
    watch: true,
  });

  React.useEffect(() => {
    if (totalSupplyData) {
      setTotalMinted(totalSupplyData);
    }
  }, [totalSupplyData]);

  const totalSum = (0.0029 * mounted).toFixed(4);

  const handleDecrement = () => {
    if (mounted <= 1) return;
    setMounted(mounted -1);
};

const handleIncrement = () => {
    if (mounted >= 10) return;
    setMounted(mounted +1);
};

useEffect(() => {
  const handleScroll = () => {
    let value = window.scrollY; // 스크롤 값으로 설정

    let starsElement = document.getElementById('stars');
    let stars2Element = document.getElementById('stars2');
    let moonElement = document.getElementById('moon');
    let rockElement = document.getElementById('rock');
    let masjidElement = document.getElementById('masjid');
    let textElement = document.getElementById('text');


    starsElement.style.bottom = value * 0.05 + '%';
    stars2Element.style.bottom = value * 0.05 + '%';
    moonElement.style.bottom = value * -0.5 + 'px';
    rockElement.style.bottom = value * -0.75 + 'px';
    masjidElement.style.bottom = value * -0.15 + 'px';
    textElement.style.right = -100 + value * 0.5 + '%';
    textElement.style.top = 50 + value * 0.1 + '%';

  };

  window.addEventListener('scroll', handleScroll);

  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, []);

  return (
  <section className="section">
    <img src={stars} id="stars" alt="stars" className="img"/>
    <img src={stars2} id="stars2" alt="stars2" className="img"/>
    <img src={moon} id="moon" alt="moon" className="img"/>
    <img src={rock} id="rock" alt="rock" className="img"/>
    <img src={masjid} id="masjid" alt="masjid" className="img"/>
    
   
    <h2 id="text">Stupid Lee Seo-yong</h2>
    <img src={bottom} id="bottom" alt="bottom" className="img"/>
    <img src={lamp} id="lamp" alt="lamp" className="img"/>
    
    {isConnected && (
      <div className="container">
        
        <div
          id="btn"
          type="button"
          onClick={handleMint}
          className="nes-btn is-error btn"
        >  
      Mint Now
      </div>
      <div type="button" class="nes-btn is-disabled supply" id="supply">{Number(totalMinted)} minted so far!</div>
      <div type="button" class="nes-btn is-disabled sum" id="sum">{Number(totalSum)} Ξ </div>
      <div type="button" class="nes-btn is-warning minus" id="minus" onClick={handleDecrement} >-</div>
      <input readOnly id="name_field" class="nes-input input" type="number"value={mounted} />
      <div type="button" class="nes-btn is-warning plus" id="plus" onClick={handleIncrement} >+</div>
    </div>
    )}
    
  </section>
  );
}
export default Home;
