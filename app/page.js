import Hero from './Hero'
import Header from './Header';
import Footer from './Footer';
import TemplateSelector from './TemplateSelector';

export default function App() {
  
    return (
      <>
      <Header />
      <Hero />
      <TemplateSelector />
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
