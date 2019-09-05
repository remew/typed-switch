const xwitch = <T>(v: T): InitialMatcher<T> => {
  return new InitialMatcherImpl(v);
};
export default xwitch;

export interface Matcher<ValueType, ResultValueType> {
  case<V extends ValueType, ReturnValueType2>(v: V, callback: () => ReturnValueType2): Matcher<ValueType, ResultValueType | ReturnValueType2>;
  end(): ResultValueType | undefined;
  default<DefaultType>(callback: () => DefaultType): ResultValueType | DefaultType;
}

export interface InitialMatcher<ValueType> {
  case<V extends ValueType, ReturnValueType>(v: V, callback: () => ReturnValueType): Matcher<ValueType, ReturnValueType>;
}

class MatcherImpl<ValueType, ReturnType> implements Matcher<ValueType, ReturnType> {
  private map: Map<ValueType, () => any>;

  constructor(private targetValue: ValueType, v: any, callback: () => ReturnType) {
    this.map = new Map();
    this.map.set(v, callback);
  }

  case<V extends ValueType, NewReturnType>(v: V, callback: () => NewReturnType): Matcher<ValueType, ReturnType | NewReturnType> {
    this.map.set(v, callback);
    return this;
  }

  default<DefaultValueType>(defaultCallback: () => DefaultValueType): ReturnType | DefaultValueType {
    const callback = this.map.get(this.targetValue);
    if (callback) {
      return callback();
    }
    return defaultCallback();
  }

  end(): ReturnType | undefined {
    const callback = this.map.get(this.targetValue);
    if (callback) {
      return callback();
    }
    return undefined;
  }
}

class InitialMatcherImpl<ValueType> implements InitialMatcher<ValueType> {
  constructor(private target: ValueType) {}

  case<V extends ValueType, ReturnValueType>(v: V, callback: () => ReturnValueType): Matcher<ValueType, ReturnValueType> {
    return new MatcherImpl(this.target, v, callback);
  }
}
