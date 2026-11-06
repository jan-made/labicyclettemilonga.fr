import GenericHomePage from '@/app/[lang]/page.tsx';
import { Params } from '@/types/props.ts';

export default function HomePage({ params }: { params: Params }) {
  return <GenericHomePage params={params} />;
}
