import { GameMode, GameQuestion } from '../types';

export class QuestionService {
  generateQuestion(mode: GameMode, level: number = 1): GameQuestion {
    switch (mode) {
      case 'math':
        return this.generateMathQuestion(level);
      case 'colors':
        return this.generateColorQuestion(level);
      case 'objects':
        return this.generateObjectQuestion(level);
      case 'patterns':
        return this.generatePatternQuestion(level);
      default:
        return this.generateMathQuestion(level);
    }
  }

  private generateMathQuestion(level: number): GameQuestion {
    const isAddition = Math.random() > 0.3 || level === 1;

    let num1: number;
    let num2: number;
    let correctAnswer: number;

    if (isAddition) {
      num1 = Math.floor(Math.random() * (4 + level * 2)) + 1;
      num2 = Math.floor(Math.random() * (4 + level * 2)) + 1;
      correctAnswer = num1 + num2;
    } else {
      num1 = Math.floor(Math.random() * (6 + level * 2)) + 4;
      num2 = Math.floor(Math.random() * (num1 - 1)) + 1;
      correctAnswer = num1 - num2;
    }

    const questionText = `${num1} ${isAddition ? '+' : '-'} ${num2} = ?`;

    const distractors = new Set<number>();
    while (distractors.size < 3) {
      const offset = (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 3) + 1);
      const val = correctAnswer + offset;
      if (val >= 0 && val !== correctAnswer) {
        distractors.add(val);
      }
    }

    const options = Array.from(distractors).concat(correctAnswer);
    this.shuffleArray(options);

    return {
      id: `q-math-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      mode: 'math',
      question: questionText,
      correctAnswer,
      options,
      difficultyLevel: level,
    };
  }

  private generateColorQuestion(level: number): GameQuestion {
    // Pure visual color objects — NO text printed on objects!
    const colorItems = [
      { colorName: 'Green', symbol: '🟢' },
      { colorName: 'Red', symbol: '🔴' },
      { colorName: 'Blue', symbol: '🔵' },
      { colorName: 'Yellow', symbol: '🟡' },
      { colorName: 'Purple', symbol: '🟣' },
      { colorName: 'Orange', symbol: '🟠' },
    ];

    const pool = colorItems.slice(0, Math.min(4 + level, colorItems.length));
    const target = pool[Math.floor(Math.random() * pool.length)];

    const questionText = `Find the ${target.colorName} Item`;

    const options = pool.map(item => item.symbol);
    this.shuffleArray(options);

    return {
      id: `q-color-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      mode: 'colors',
      question: questionText,
      correctAnswer: target.symbol,
      options,
      difficultyLevel: level,
    };
  }

  private generateObjectQuestion(level: number): GameQuestion {
    // Pure visual objects — NO text labels on objects!
    const objectItems = [
      { name: 'Radio', symbol: '📻' },
      { name: 'Tea Cup', symbol: '☕' },
      { name: 'Camera', symbol: '📷' },
      { name: 'Telephone', symbol: '📞' },
      { name: 'Book', symbol: '📖' },
      { name: 'Lamp', symbol: '🪔' },
      { name: 'Flower', symbol: '🌼' },
    ];

    const target = objectItems[Math.floor(Math.random() * objectItems.length)];
    const questionText = `Find the ${target.name}`;

    const distractorPool = objectItems.filter(o => o.name !== target.name);
    this.shuffleArray(distractorPool);
    const selectedDistractors = distractorPool.slice(0, 3).map(o => o.symbol);

    const options = [target.symbol, ...selectedDistractors];
    this.shuffleArray(options);

    return {
      id: `q-obj-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      mode: 'objects',
      question: questionText,
      correctAnswer: target.symbol,
      options,
      difficultyLevel: level,
    };
  }

  private generatePatternQuestion(level: number): GameQuestion {
    const patternSets = [
      { seq: '🔴  🔵  🔴  🔵  ?', ans: '🔴', options: ['🔴', '🔵', '🟢', '🟡'] },
      { seq: '⭐  🌙  ⭐  🌙  ?', ans: '⭐', options: ['⭐', '🌙', '☀️', '🌸'] },
      { seq: '▲  ■  ▲  ■  ?', ans: '▲', options: ['▲', '■', '●', '★'] },
      { seq: '🍎  🍊  🍎  🍊  ?', ans: '🍎', options: ['🍎', '🍊', '🍇', '🍌'] },
    ];

    const chosen = patternSets[Math.floor(Math.random() * patternSets.length)];

    return {
      id: `q-pat-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      mode: 'patterns',
      question: chosen.seq,
      correctAnswer: chosen.ans,
      options: chosen.options,
      difficultyLevel: level,
    };
  }

  private shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}

export const questionService = new QuestionService();
