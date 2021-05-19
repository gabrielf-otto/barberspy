import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import { isToday, format, parseISO, isAfter } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { FiClock, FiPower } from 'react-icons/fi';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import barberspyLogo from '../../assets/barberspyLogo.png';
import { 
   Container,
   Header, 
   HeaderContent, 
   Profile, 
   Content, 
   Schedule, 
   Calendar, 
   NextAppointment, 
   Section,
   Appointment 
} from './styles';


interface IMonthAvailabilityItem {
   day: number;
   available: boolean;
}

interface IAppointment {
   id: string;
   date: string;
   formattedHour: string;

   user: {
      name: string;
      avatar_url: string;
   };
}

const Dashboard: React.FC = () => {
   const [selectedDay, setSelectedDay] = useState(new Date);
   const [currentMonth, setCurrentMonth] = useState(new Date);
   const [appointments, setAppointments] = useState<IAppointment[]>([]);
   const [monthAvailability, setMonthAvailability] = useState<IMonthAvailabilityItem[]>([]);

   const { signOut, user } = useAuth();
 

   const changeDay = useCallback((day: Date, modifiers: DayModifiers) => 
   {
      if (modifiers.available && !modifiers.disabled) {
         setSelectedDay(day);
      }
   },
   []);

   const changeMonth = useCallback((month: Date) => {
      setCurrentMonth(month);
   },
   []);

   const unavailableDays = useMemo(() => 
   {
      const unavailables = monthAvailability
         .filter(day => !day.available)
         .map(day => 
         {
            const month = currentMonth.getFullYear();
            const year = currentMonth.getMonth();
            return new Date(month, year, day.day);
         });
      
      return unavailables;
   },
   [currentMonth, monthAvailability]);

   const formattedDay = useMemo(() => {
      return format(selectedDay, '\'Dia\' dd \'de\' MMMM', {
         locale: ptBR
      });
   },
   [selectedDay]);

   const formattedWeekDay = useMemo(() => {
      return format(selectedDay, 'cccc', { 
         locale: ptBR 
      });
   },
   [selectedDay]);

   const morningAppointments = useMemo(() => {
      return appointments.filter(appointment => 
         parseISO(appointment.date).getHours() < 12   
      );
   },
   [appointments]);

   const afternoonAppointments = useMemo(() => {
      return appointments.filter(appointment => 
         parseISO(appointment.date).getHours() >= 12   
      );
   },
   [appointments]);

   const nextAppointment = useMemo(() => {
      return appointments.find(appointment => 
         isAfter(parseISO(appointment.date), new Date)
      )
   },
   [appointments]);

   useEffect(() => {
      const month = currentMonth.getMonth() + 1;
      const parsedMonth = month.toString().padStart(2, '0');
      const year = currentMonth.getFullYear();

      api.get(`/providers/${user.id}/month/availability/${parsedMonth}/${year}`)
         .then(response => {
            setMonthAvailability(response.data);
         }
      );
   },
   [currentMonth, user.id]);

   useEffect(() => {
      const day = selectedDay.getDate();
      const month = selectedDay.getMonth() + 1;

      const parsedDay = day.toString().padStart(2, '0');
      const parsedMonth = month.toString().padStart(2, '0');
      const year = selectedDay.getFullYear();
   
      api.get<IAppointment[]>(`/appointments/me/${parsedDay}/${parsedMonth}/${year}`)
         .then(response => {
            if (response.data) 
            {
               const formatted = response.data.map(appointment => ({
                  ...appointment,
                  formattedHour: format(parseISO(appointment.date), 'HH:mm')
               }));
               setAppointments(formatted);
            }
         }
      );
   },
   [selectedDay]);

   return (
      <Container>
         <Header>
            <HeaderContent>
               <img src={barberspyLogo} alt="Barberpsy"/>

               <Profile>
                  <img src={user.avatar_url} alt=""/>
                  <div>
                     <span>Bem-vindo</span>
                     <Link to="/profile">
                        <strong>{user.name}</strong>
                     </Link>
                  </div>
               </Profile>

               <button type="button" onClick={signOut}>
                  <FiPower />
               </button>
            </HeaderContent>
         </Header>

         <Content>
            <Schedule>
               <h1>Horários agendados</h1>
               <p>
                  {isToday(selectedDay) && <span>Hoje</span>}
                  <span>{formattedDay}</span>
                  <span>{formattedWeekDay}</span>
               </p>

               {isToday(selectedDay) && nextAppointment && (
                  <NextAppointment>
                     <strong>Atendimento a seguir</strong>
                     <div>
                        <img 
                           src={nextAppointment.user.avatar_url} 
                           alt={nextAppointment.user.name}
                        />

                        <strong>{nextAppointment.user.name}</strong>
                        <span>
                           <FiClock />
                           {nextAppointment.formattedHour}
                        </span>
                     </div>
                  </NextAppointment>
               )}
            
               <Section>
                  <strong>Manhã</strong>

                  {morningAppointments.length === 0 && 
                     <p>Nenhum agendamento nesse período</p>
                  }

                  {morningAppointments.map(appointment => (
                     <Appointment key={appointment.id}>
                        <span>
                           <FiClock />
                           {appointment.formattedHour}
                        </span>

                        <div>
                           <img 
                              src={appointment.user.avatar_url} 
                              alt={appointment.user.name}
                           />
                           <strong>{appointment.user.name}</strong>
                        </div>
                     </Appointment>
                  ))}
               </Section>

               <Section>
                  <strong>Tarde</strong>

                  {morningAppointments.length === 0 && 
                     <p>Nenhum agendamento nesse período</p>
                  }

                  {afternoonAppointments.map(appointment => (
                     <Appointment key={appointment.id}>
                        <span>
                           <FiClock />
                           {appointment.formattedHour}
                        </span>

                        <div>
                           <img 
                              src={appointment.user.avatar_url} 
                              alt={appointment.user.name}
                           />
                           <strong>{appointment.user.name}</strong>
                        </div>
                     </Appointment>
                  ))}
               </Section>
            </Schedule>
            <Calendar>
               <DayPicker 
                  weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
                  fromMonth={new Date}
                  modifiers={{
                     available: { daysOfWeek: [1, 2, 3, 4, 5] }
                  }}
                  selectedDays={selectedDay}
                  onDayClick={changeDay}
                  onMonthChange={changeMonth}
                  disabledDays={[
                     { daysOfWeek: [0, 6] },
                     ...unavailableDays
                  ]}
                  months={[
                     'Janeiro',
                     'Fevreiro',
                     'Março',
                     'Abril',
                     'Maio',
                     'Junho',
                     'Julho',
                     'Agosto',
                     'Setembro',
                     'Outobro',
                     'Novembro',
                     'Dezembro'
                  ]}
               />
            </Calendar>
         </Content>
      </Container>
   );
};


export default Dashboard;
