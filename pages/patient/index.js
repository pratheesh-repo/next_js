import Link from "next/link";
import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { gql } from "@apollo/client";
import client from "../../apolloClient";

export const getStaticProps = async () => {
  try {
    const { data } = await client.query({
      query: gql`
        query Countries {
          countries {
            code
            name
            emoji
          }
        }
      `,
    });

    return {
      props: {
        countries: data.countries,
      },
    };
  } catch (error) {
    return {
      props: {
        error: true,
      },
    };
  }
};

const Posts = ({ countries, setView, error }) => {
  const router = useRouter();

  const notifyError = () =>
    toast("You need to login to fetch patient's details!", {
      position: toast.POSITION.TOP_CENTER,
    });

  useEffect(() => {
    if (localStorage.getItem("user_login") !== null) {
      setView(true);
    } else {
      router.push("/");
      setView(false);
      setTimeout(() => {
        notifyError();
      }, 500);
    }
  }, []);

  useEffect(() => {
    if (error) {
      router.push("/500");
    }
  }, [error]);

  return (
    <>
      <Head>
        <title>Patient Details</title>
      </Head>
      {countries?.map((currElem) => {
        const { code, name, emoji } = currElem;
        return (
          <div className="cards" key={code}>
            <h3>{emoji}</h3>
            <Link href={`/patient/${name.length}`}>
              <h3>{name}</h3>
            </Link>
            <h2 className="title_link">{code}</h2>
          </div>
        );
      })}
      <ToastContainer />
    </>
  );
};

export default Posts;
