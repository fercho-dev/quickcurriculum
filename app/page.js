import Hero from './Hero'
import Form from './Form';
import Header from './Header';

export default function App() {
  
    return (
      <>
      <Header />
      <Hero />
      <Form />
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
