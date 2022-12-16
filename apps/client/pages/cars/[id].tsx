import { Car } from '@next-spike/models';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import React from 'react';

export const getStaticPaths: GetStaticPaths = async (context) => {
  console.log('[Car] getStaticPaths...');

  const cars: Car[] = await fetch('http://localhost:3333/api/cars').then(
    (res) => res.json()
  );

  return {
    paths: cars.map((c) => ({ params: { id: c.id.toString() } })),
    fallback: 'blocking', // can also be true or 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  console.log('[Car] getStaticProps...');

  const car: Car = await fetch(
    `http://localhost:3333/api/cars/${context.params.id}`
  )
    .then((res) => res.json())
    .catch(console.error);

  return {
    props: {
      car,
    },
    revalidate: 20,
    notFound: !car,
  };
};

export default function Cars({
  car,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log('[Car] generating...');
  return (
    <>
      <h1>Car</h1>
      <h2>
        {car.color} {car.model}
      </h2>
    </>
  );
}
