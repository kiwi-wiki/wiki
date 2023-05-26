import { makeTitle } from '@/utils/metadata';
import type { Metadata } from 'next';

interface Props {
  params: {
    categorySlug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: makeTitle({ title: params.categorySlug }),
  };
}

export default function CategoryPage({ params }: Props) {
  return <div>{params.categorySlug}</div>;
}
