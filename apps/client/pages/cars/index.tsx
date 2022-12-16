import { Car } from '@next-spike/models';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import React from 'react';

export const getStaticProps: GetStaticProps = async (context) => {
  console.log('[Cars] getStaticProps...');
  const cars: Car[] = await fetch('http://localhost:3333/api/cars').then(
    (res) => res.json()
  );

  return {
    props: {
      cars,
    },
    revalidate: 20,
  };
};

export default function Cars({
  cars,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log('[Cars] generating...');

  return (
    <>
      <h1>Cars</h1>
      <ul>
        {cars.map((c: Car) => (
          <li key={c.id}>
            {c.id}: {c.color} {c.model}
          </li>
        ))}
      </ul>
    </>
  );
}
