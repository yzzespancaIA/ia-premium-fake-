import dynamic from 'next/dynamic';
const PainelFake = dynamic(() => import('@/components/FakeIAPainel'), { ssr: false });
export default PainelFake;
