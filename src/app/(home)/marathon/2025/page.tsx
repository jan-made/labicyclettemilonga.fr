import { Params } from '@/types/props.ts';
import GenericMarathon2025Page from '@/app/[lang]/marathon/2025/page.tsx';

export default function Marathon2025Page({ params }: { params: Params }) {
  return <GenericMarathon2025Page params={params} />;
}
