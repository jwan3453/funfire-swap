'use client'
import React, { useState } from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./SearchToken.module.css";
import images from "../../assets";

const SearchToken = ({ openToken, tokens, tokenData }) => {
  //USESTATE
  const [active, setActive] = useState(0);

  // let tokenList = [];
  // for (let i = 0; i < tokenData.length; i++) {
  //   if (i % 2 == 1) tokenList.push(tokenData[i]);
  // }

  // const coin = [
  //   {
  //     img: images.ether,
  //     name: "ETH",
  //     tokenBalance: '20',
  //   },
  //   {
  //     img: images.ether,
  //     name: "DAI",
  //     tokenBalance: '320',
  //   },
  //   {
  //     img: images.ether,
  //     name: "DOG",
  //     tokenBalance: '40',
  //   },
  //   {
  //     img: images.ether,
  //     name: "FUN",
  //     tokenBalance: '120',
  //   },
  //   {
  //     img: images.ether,
  //     name: "WETH9",
  //     tokenBalance: '20',
  //   },
  //   {
  //     img: images.ether,
  //     name: "UNI",
  //     tokenBalance: '220',
  //   },
  //   {
  //     img: images.ether,
  //     name: "TIME",
  //     tokenBalance: '420',
  //   },
  //   {
  //     img: images.ether,
  //     name: "LOO",
  //     tokenBalance: '201',
  //   }
  // ];
  return (
    <div className={Style.SearchToken}>
      <div className={Style.SearchToken_box}>
        <div className={Style.SearchToken_box_heading}>
          <h4>Select a token</h4>
          <Image
            style={{ cursor: 'pointer'}}
            src={images.close}
            alt="close"
            width={50}
            height={50}
            onClick={() => openToken(false)}
          />
        </div>

        <div className={Style.SearchToken_box_search}>
          <div className={Style.SearchToken_box_search_img}>
            <Image src={images.search} alt="img" width={20} height={20} />
          </div>
          <input type="text" placeholder="Search name and past the address" />
        </div>

        <div className={Style.SearchToken_box_tokens}>
          {tokenData.map((el, i) => (
            <span
              key={i + 1}
              className={active == i + 1 ? `${Style.active}` : ""}
              onClick={() => (
   
                setActive(i + 1),
                tokens({
                  name: el.name,
                  image: el.img,
                  symbol: el.symbol,
                  tokenBalance: el.tokenBalance,
                  tokenAddress: el.tokenAddress,
                }),
                openToken(false)
              )}
            >
              <Image
                src={el.img || images.ether}
                alt="image"
                width={30}
                height={30}
              />
              {el.symbol}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchToken;
