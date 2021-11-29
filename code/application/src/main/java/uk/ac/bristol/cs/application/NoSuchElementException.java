package uk.ac.bristol.cs.application;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class NoSuchElementException extends RuntimeException {

    public NoSuchElementException(Class<?> cls, String id) {
        super("Could not find an instance of " + cls.getName() + " for id " + id);
    }
}