"use client"

import Head from "next/head";
import Image from "next/image";
import Ranking from "../components/ranking";
import Modalities from "../components/modalities";
import Level from "../components/level";
import { Container } from "../components/container";
import { useState } from "react";
import { Header } from "@/components/header";


export default function Home() {
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
        <div className="flex justify-between items-start gap-8 mt-8 mb-5 w-full">
          <h1 className="w-3/4 justify-center">

          <Ranking level={level} type={type} />

          </h1>

          <section className="w-1/4">
            <div className="mb-4">
              <Modalities setTypes={setTypes}/>
            </div>
            <div>
              <Level setQuestions={setQuestions} />
            </div>


          </section>
        </div>
      </Container>

    </>
  );
}
