import { Params } from '@/types/props.ts';
import GenericTeamPage from '@/app/[lang]/team/page.tsx';

export default function TeamPage({ params }: { params: Params }) {
  return <GenericTeamPage params={params} />;
}
