import { useEffect } from "react";
import Head from "next/head";

import { gql } from "@apollo/client";

import client from "../../api/apolloClient";
import pino from "../../logger";
import {
  container,
  id_style,
  val_style,
} from "../../styles/Country.module.css";

export const getStaticPaths = async () => {
  try {
    const { data } = await client.query({
      query: gql`
        query Countries {
          countries {
            code
          }
        }
      `,
    });

    const paths = data.countries.map((curElem) => {
      return {
        params: { pageNo: curElem.code.toString() },
      };
    });

    return {
      paths,
      fallback: false,
    };
  } catch (error) {
    pino.info(`Error: ${error}`);
  }
};

export const getStaticProps = async (context) => {
  try {
    const id = context.params.pageNo;
    pino.info(`id ${id}`);
    const { data } = await client.query({
      query: gql`
        query Country($code: ID!) {
          country(code: $code) {
            code
            name
            currency
            capital
            native
            emoji
            languages {
              code
              name
            }
          }
        }
      `,
      variables: {
        code: id,
      },
    });

    pino.info(`Patient details response: ${JSON.stringify(data)}`);

    return {
      props: {
        data: data.country,
      },
    };
  } catch (error) {
    pino.info(`Error: ${error}`);
  }
};

const PatientData = ({ data, setView }) => {
  useEffect(() => {
    setView(true);
  }, []);

  const { name, native, capital, languages, currency, emoji } = data;
  return (
    <>
      <div className="cards_details">
        <Head>
          <title>Patient Country Details</title>
        </Head>
        <div className={container} key={languages[0]?.code}>
          <h2 className={id_style}>Patient Country : {name}</h2>
          <h3 className={val_style}>Patient Language : {languages[0]?.name}</h3>
          <h3 className={val_style}>Native : {native}</h3>
          <h3 className={val_style}>Capital : {capital}</h3>
          <h3 className={val_style}>Currency : {currency}</h3>
          <h3 className={val_style}>Emoji : {emoji}</h3>
        </div>
      </div>
    </>
  );
};

export default PatientData;
