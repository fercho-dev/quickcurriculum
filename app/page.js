import Hero from './Hero'
import Form from './Form';
import Header from './Header';
import Footer from './Footer';

export default function App() {
  
    return (
      <>
      <Header />
      <Hero />
      <Form />
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
