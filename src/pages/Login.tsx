
import React from 'react';
import FadeIn from '@/components/animations/FadeIn';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import LoginForm from '@/components/auth/LoginForm';
import TestAccountInfo from '@/components/auth/TestAccountInfo';
import LoginHeader from '@/components/auth/LoginHeader';

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isLoggedIn={false} />
      
      <main className="flex-grow pt-20">
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto">
              <FadeIn direction="up" className="text-center mb-8">
                <LoginHeader />
              </FadeIn>
              
              <FadeIn direction="up" delay={100}>
                <LoginForm />
              </FadeIn>
              
              <TestAccountInfo />
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
