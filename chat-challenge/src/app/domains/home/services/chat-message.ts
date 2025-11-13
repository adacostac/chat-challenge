import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ChatMessageModel } from '../models/chat-message.model';

@Injectable({
  providedIn: 'root',
})
export class ChatMessageService {
  private _messages = new BehaviorSubject<ChatMessageModel[]>([
    {
      from: 'bot', text: '¡Hola! ¿En qué puedo ayudarte hoy?', time: Date.now(),
    }
  ]);
  messages$ = this._messages.asObservable();

  private readonly _answers: Record<number, string> = {
    1: 'Un chatbot es un programa (o servicio) que simula conversaciones con personas. Puede basarse en reglas o en modelos de lenguaje para interpretar preguntas y dar respuestas automáticas.',
    2: 'Los chatbots pueden funcionar mediante reglas predefinidas (árboles de decisión) o usando NLP/ML: reciben el texto, detectan la intención y generan una respuesta; muchos sistemas combinan ambas estrategias.',
    3: 'Beneficios: atención 24/7, reducción de costes, manejo de volúmenes altos de consultas, respuestas consistentes y posibilidad de escalar procesos repetitivos.',
    4: 'Se utilizan en atención al cliente, soporte técnico, comercio electrónico, recursos humanos, educación y en cualquier flujo donde sea útil automatizar la interacción con usuarios.'
  };

  public sendMessage(text: string, answerById?: number): void {
    const now = Date.now();
    const userMsg: ChatMessageModel = { from: 'user', text, time: now, answerId: answerById };
    this._push(userMsg);

    const replyText = (typeof answerById === 'number')
      ? this._answerById(answerById)
      : this._botReply(text);

    setTimeout(() => {
      const botMsg: ChatMessageModel = { from: 'bot', text: replyText, time: Date.now(), answerId: answerById };
      this._push(botMsg);
    }, 600 + Math.random() * 800);
  }

  private _push(msg: ChatMessageModel) {
    const arr = [...this._messages.getValue(), msg];
    this._messages.next(arr);
  }

  private _botReply(userText: string) {
    const t = userText.toLowerCase();
    if (t.includes('chatbot')) return 'Un chatbot es un programa que simula conversaciones.';
    if (t.includes('beneficio') || t.includes('beneficios')) return 'Automatización, disponibilidad 24/7 y ahorro de costes.';
    return 'Respuesta simulada: gracias por la pregunta.';
  }

  private _answerById(id: number): string {
    return this._answers[id] ?? 'Lo siento, no tengo esa respuesta guardada.';
  }
}
