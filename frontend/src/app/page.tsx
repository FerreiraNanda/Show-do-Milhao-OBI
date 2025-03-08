"use client"

import Head from "next/head";
import Ranking from "../components/ranking";
import Modalities from "../components/modalities";
import Level from "../components/level";
import { Container } from "../components/container";
import { useState } from "react";
import { withAuth } from "@/hooks/withAuth";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";


function Home() {
  const [level, setLevel] = useState<string>("");

  const [type, setType] = useState<string>("");

  const setQuestions = (levels: string) => {
    setLevel(levels);
  }

  const setTypes = (types: string) => {
    setType(types);
  }

  return (
    <>
      <Head>
        <title>Show do Milhão</title>
      </Head>
      <Header/>
      <Container>
        <div className="flex gap-4 items-start justify-center mt-8 mb-5 w-full h-screen">
          <h1 className="w-[60%] justify-center h-[80%]">

          <Ranking level={level} type={type} />

          </h1>

          <section className="w-40%">
            <div className="mb-4">
              <Modalities setTypes={setTypes}/>
            </div>
            <div>
              <Level setQuestions={setQuestions} />
            </div>


          </section>
        </div>
      </Container>
      <Footer/>
    </>
  );
}
export default withAuth(Home);
