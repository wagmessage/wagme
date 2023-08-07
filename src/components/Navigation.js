import React, { useEffect } from 'react';
import './Navigation.css';
import "nes.css/css/nes.min.css";
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Navigation = () => {

  useEffect(() => {
    const toggleMenu = document.querySelector('.toggle');
    const navigation = document.querySelector('.navigation');

    const handleToggleMenu = () => {
      toggleMenu.classList.toggle('active');
      navigation.classList.toggle('active');
    };

    toggleMenu.addEventListener('click', handleToggleMenu);

    return () => {
      toggleMenu.removeEventListener('click', handleToggleMenu);
    };
  }, []);

  return (
    <header className="header">
      <a href="#" className="logo"></a>
        <div className="toggle"></div>
          <ul className="navigation">
            <li><a className="nes-btn" href="#">Home</a></li>
            <li><a className="nes-btn" href="#">About</a></li>
            <li><a className="nes-btn" href="#">Schedule</a></li>
            <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus ||
            authenticationStatus === 'authenticated');

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              'style': {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button 
                  onClick={openConnectModal} 
                  type="button"
                  className="nes-btn is-primary">
                    Connect
                  </button>
                );
              }

              return (
                <div style={{ display: 'flex', gap: 12 }}>


                  <button 
                  onClick={openAccountModal} 
                  type="button"
                  className="nes-btn is-success">
                    Connected
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
          </ul>
    </header>

  );
}

export default Navigation;
