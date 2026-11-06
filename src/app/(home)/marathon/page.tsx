import { Params } from '@/types/props.ts';
import GenericMarathonPage from '@/app/[lang]/marathon/page.tsx';

export default function MarathonPage({ params }: { params: Params }) {
  return <GenericMarathonPage params={params} />;
}
