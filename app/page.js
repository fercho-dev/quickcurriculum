import Hero from './Hero'
import Header from './Header';
import Footer from './Footer';
import CTA from './CTA';

export default function App() {
  
    return (
      <>
      <Header />
      <Hero />
      <CTA />
      <Footer />
      {/* {messages.map(m => (
        <div key={m.id}>
          {m.role === 'user' ? 'user: ': 'AI: '}
          {m.content}
          {}
        </div>
      ))} */}
    </>
    );
}
